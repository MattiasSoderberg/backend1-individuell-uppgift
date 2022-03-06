const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile: {
        email: String,
        bio: String,
        image: {
            url: String,
            mimetype: String
        }
    },
    follows: Array,
    followers: Array,
    posts: Array
})

userSchema.pre("save", async function(next) {
        if (this.password && this.isNew) {
            const hash = await bcrypt.hash(this.password, 10)
            this.password = hash
            next()
        }
    }
)

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username })
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if(validPassword) return user
        else return null
    } else return null
}

module.exports = mongoose.model("User", userSchema)