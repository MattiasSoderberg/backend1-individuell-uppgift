const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    text: { type: String, maxLength: 140 },
    time: Number,
    timeDisplay: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)