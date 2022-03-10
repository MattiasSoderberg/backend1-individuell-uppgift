const express = require("express")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const User = require("../models/User")
const Post = require("../models/Post")
const TokenBlacklist = require("../models/TokenBlacklist")
const userRouter = express.Router()
const { verifyUsername, verifyToken, checkEmptyFields } = require("../middlewares/validation")


// Requires header auth
userRouter.get("/me", verifyToken, async (req, res) => {

    const user = await User.findOne({ _id: req.user.id })

    if (user) {
        const posts = await Post.find({ author: user._id }).populate("author").sort({ time: -1 })
        const returnData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            follows: user.follows,
            followers: user.followers,
            profile: user.profile,
            posts
        }
        res.status(200).json(returnData)
    } else {
        res.status(400).json({ message: "Not found" })
    }
})

// Requires header auth
userRouter.patch("/me", verifyToken, upload.single("imageFile"), async (req, res) => {
    try {
        const { id } = req.user
        const { file } = req
        const { firstName, lastName, email, bio } = req.body
        const user = await User.findOne({ _id: id })

        if (email) {
            user.profile.email = email
        }
        if (bio) {
            user.profile.bio = bio
        }
        if (firstName) {
            user.profile.firstName = firstName
        }
        if (lastName) {
            user.profile.lastName = lastName
        }
        if (file) {
            user.profile.image = {
                mimetype: file.mimetype,
                url: file.path
            }
        }

        await user.save()
        res.sendStatus(200)
    }
    catch (err) {
        console.log("Error catch", err)
        res.status(400).json(err)
    }
})

// Creates a user
userRouter.post("/create", verifyUsername, checkEmptyFields, async (req, res) => {
    const { password } = req.body
    const username = req.body.username.toLowerCase()
    const user = new User({
        username,
        password
    })
    await user.save()
    res.sendStatus(201)
})

// username and password
userRouter.post("/login", checkEmptyFields, async (req, res) => {
    const { username, password } = req.body
    const user = await User.login(username, password)
    if (user) {
        jwt.sign({ username, id: user._id.toString() }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                res.status(401).json(err)
            } else {
                res.status(200).json({ token })
            }
        })
    } else {
        res.status(401).json({ message: "Incorrect username or password" })
    }
})

userRouter.get("/logout", verifyToken, async (req, res) => {
    const activeToken = req.headers.authorization.split(" ")[1]
    const token = new TokenBlacklist({ token: activeToken })

    await token.save()

    res.status(200).json({ message: `Token: ${activeToken} added to blacklist` })
})

userRouter.get("/:username", async (req, res) => {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (user) {
        const posts = await Post.find({ author: user._id }).populate("author").sort({ time: -1 })
        const returnData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            follows: user.follows,
            followers: user.followers,
            profile: user.profile,
            posts
        }
        res.status(200).json(returnData)
    } else {
        res.status(400).json({ message: "No user found" })
    }


})

userRouter.get("/:id/follow", verifyToken, async (req, res) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    const followingUser = await User.findOne({ _id: req.user.id })
    followingUser.follows.push(user._id)
    user.followers.push(followingUser._id)
    await followingUser.save()
    await user.save()
    res.status(201).json({ message: `Following user ${user._id}` })
})

userRouter.get("/:id/unfollow", verifyToken, async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    const followingUser = await User.findOne({ _id: req.user.id })
    followingUser.follows.pull(user._id)
    user.followers.pull(followingUser._id)
    await followingUser.save()
    await user.save()
    res.status(201).json({ message: `Unfollowing user ${id}` })
})

module.exports = userRouter