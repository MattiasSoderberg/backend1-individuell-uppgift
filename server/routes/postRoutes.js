const express = require("express")
const { verifyToken, checkPostLength } = require("../middlewares/validation")
const Post = require("../models/Post")
const User = require("../models/User")
const Tag = require("../models/Tag")

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
            const regex = /#[\p{L}0-9]*/igu
            const tags = text.match(regex)
            const trimedTags = tags.map(tag => tag.substring(1))
            const post = new Post({
                text,
                time: Date.now(),
                author: user._id,
            })
            if (tags) {
                post.tags = trimedTags
                const existingTags = await Tag.find({ tag: { $in: trimedTags } })
                const nonExistingTags = trimedTags.filter(tag => existingTags.every(existingTag => existingTag.tag !== tag))
                const objectifiedTags = nonExistingTags.map(tag => ({tag}))
                console.log(objectifiedTags)
                
                if (objectifiedTags) {
                    try {
                        await Tag.insertMany(objectifiedTags)
                    } catch(err) {
                        console.log(err)
                    }
                }
            }
            user.posts.push(post._id)

            await user.save()
            await post.save()
            res.sendStatus(200)
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

postRouter.get("/:tag", async (req, res) => {
    const { tag } = req.params
    const posts = await Post.find({ tags: tag }).populate("author").sort({ time: -1 })
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(400).json({ message: "No posts found" })
    }
})

module.exports = postRouter