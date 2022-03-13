const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    text: { type: String, maxLength: 140 },
    time: String,
    timeDisplay: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [String]
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)