const mongoose = require("mongoose")
const { calculateTime } = require("../helpers")

const postSchema = mongoose.Schema({
    text: { type: String, maxLength: 140 },
    time: { type: Number, default: Date.now() },
    timeDisplay: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

const getAllPosts = async (query) => {
    const posts = await Post.find(query).populate("author").sort({ time: -1 })
    if (posts) {
        posts.forEach(post => {
            post.timeDisplay = calculateTime(post.time) || post.createdAt.toString().slice(0, 15)
        })
    }
    return posts
}

const getPostById = async (id) => {
    const post = await Post.findOne({ _id: id })
        .populate("author")
        .populate({
            path: "comments",
            populate: {
                path: "author"
            },
            options: {
                sort: { time: -1 }
            }
        })
    return post
}

const createPost = async (post) => {
    return await Post.create(post)
}

module.exports = { getAllPosts, createPost, getPostById, Post }