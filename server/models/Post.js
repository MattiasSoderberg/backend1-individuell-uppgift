const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    text: { type: String, maxLength: 10 },
    time: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Post", postSchema)