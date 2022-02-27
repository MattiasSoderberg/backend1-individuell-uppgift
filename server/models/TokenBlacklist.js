const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    tokens: [{type: String}]
})

module.exports = mongoose.model("TokenBlacklist", blacklistSchema)