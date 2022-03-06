const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token: String
})

module.exports = mongoose.model("TokenBlacklist", blacklistSchema)