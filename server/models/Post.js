const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    text: { type: String, maxLength: 140 },
    time: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)