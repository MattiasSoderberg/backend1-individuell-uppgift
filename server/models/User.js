const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    profile: {
        firstName: String,
        lastName: String,
        email: String,
        bio: String,
        image: {
            url: String,
            mimetype: String
        }
    },
    follows: [mongoose.Types.ObjectId],
    followers: [mongoose.Types.ObjectId],
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }]
})

userSchema.pre("save", async function (next) {
    if (this.modifiedPaths().includes("password")) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
})

const User = mongoose.model("User", userSchema)

const login = async (username, password) => {
    const user = await User.findOne({ username }).select("+password")
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) return user
        else return null
    } else return null
}

const getUser = async (username) => {
    const user = await User.findOne({ username }).populate({
        path: "posts",
        populate: "author"
    })
    return user
}

const getAllUsers = async () => {
    return await User.find()
}

const updateUser = async (username, query) => {
    const user = await User.findOneAndUpdate({ username }, { query })
    return user
}

const followUser = async (userId, username) => {
    const followingUser = await User.findOne({ username })
    const user = await User.findOneAndUpdate({ _id: userId }, { "$push": { "followers": followingUser._id } })
    followingUser.follows.push(user._id)
    await followingUser.save()
    return { followingUser, user }
}

const unFollowUser = async (userId, username) => {
    const followingUser = await User.findOne({ username })
    const user = await User.findOneAndUpdate({ _id: userId }, { "$pull": { "followers": followingUser._id } })
    followingUser.follows.pull(user._id)
    await followingUser.save()
    return { followingUser, user }
}

const createUser = async (user) => {
    return await User.create(user)
}

module.exports = {
    getUser,
    login,
    createUser,
    updateUser,
    followUser,
    unFollowUser,
    getAllUsers
}