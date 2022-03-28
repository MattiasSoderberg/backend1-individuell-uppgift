const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, maxLength: 100 },
    time: Number
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)