const express = require("express")
const { verifyToken, checkPostLength } = require("../middlewares/validation")
const Post = require("../models/Post")
const User = require("../models/User")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    const posts = await Post.find().populate("author").sort({ time: -1 })

    res.status(200).json(posts)
})

postRouter.post("/", verifyToken, checkPostLength, async (req, res) => {
    const { id } = req.user
    const { text } = req.body

    if (id) {
        const user = await User.findOne({ _id: id })
        if (text) {
            const post = new Post({
                text,
                time: new Date(),
                author: user._id
            })
            user.posts.push(post._id)

            await user.save()
            await post.save()
            res.status(200)
        } else {
            res.status(400).json({ message: "Post cannot be empty" })
        }
    } else {
        res.status(400).json({ message: "User not found" })
    }
})

postRouter.get("/follows", verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })
    const posts = await Post.find({ author: { $in: user.follows } }).populate("author").sort({ time: -1 })

    res.status(200).json(posts)
})

module.exports = postRouter