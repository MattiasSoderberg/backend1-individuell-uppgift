const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, maxLength: 100 },
    time: { type: Number, default: Date.now() }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

const createComment = async (comment) => {
    return await Comment.create(comment)
}
module.exports = { createComment }