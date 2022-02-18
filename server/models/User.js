const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    isLoggedIn: Boolean,
    profile: {
        email: String,
        imageUrl: String,
        bio: String
    },
    follows: Array,
    followers: Array
})

module.exports = mongoose.model("User", userSchema)