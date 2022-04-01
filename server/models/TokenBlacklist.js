const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token: String
})

const TokenBlacklist = mongoose.model("TokenBlacklist", blacklistSchema)

const insertToken = async (token) => {
    return await TokenBlacklist.create({ token })
}

module.exports = { insertToken, TokenBlacklist }