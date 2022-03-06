const express = require("express")
const { verifyToken } = require("../middlewares/validation")
const Post = require("../models/Post")
const User = require("../models/User")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    const posts = await Post.find().populate("author").sort({ time: -1 })
    
    res.status(200).json(posts)
})

postRouter.post("/", verifyToken, async (req, res) => {
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
            res.status(200).json({ message: "Post posted" })
        } else {
            res.status(400).json({ message: "Post cannot be empty" })
        }
    } else {
        res.status(400).json({ message: "User not found" })
    }
})

module.exports = postRouter