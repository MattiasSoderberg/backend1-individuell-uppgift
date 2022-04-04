const express = require("express")
const { verifyToken, checkPostLength, checkEmptyFields } = require("../middlewares/validation")
const {Post} = require("../models/Post")
const {User} = require("../models/User")
const Tag = require("../models/Tag")
const { calculateTime } = require("../helpers")
const Comment = require("../models/Comment")
const { postController } = require("../controllers/postController")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    postController.getPosts(req, res)
})

postRouter.post("/", verifyToken, checkPostLength, async (req, res) => {
    postController.createPost(req, res)
    // const { id } = req.user
    // const { text } = req.body

    // if (id) {
    //     const user = await User.findOne({ _id: id })
    //     if (text) {
    //         const regex = /#[\p{L}0-9]*/igu
    //         const tags = text.match(regex)
    //         const post = new Post({
    //             text,
    //             time: Date.now(),
    //             author: user._id,
    //         })
    //         if (tags) {
    //             const trimedTags = tags.map(tag => tag.substring(1))
    //             post.tags = trimedTags
    //             const existingTags = await Tag.find({ tag: { $in: trimedTags } })
    //             const nonExistingTags = trimedTags.filter(tag => existingTags.every(existingTag => existingTag.tag !== tag))
    //             const objectifiedTags = nonExistingTags.map(tag => ({ tag }))

    //             if (objectifiedTags) {
    //                 try {
    //                     await Tag.insertMany(objectifiedTags)
    //                 } catch (err) {
    //                     console.log(err)
    //                 }
    //             }
    //         }
    //         user.posts.push(post._id)

    //         await user.save()
    //         await post.save()
    //         res.sendStatus(200)
    //     } else {
    //         res.status(400).json({ message: "Post cannot be empty" })
    //     }
    // } else {
    //     res.status(400).json({ message: "User not found" })
    // }
})

postRouter.get("/follows", verifyToken, async (req, res) => {
    postController.getPostByFollows(req, res)
    // const user = await User.findOne({ _id: req.user.id })
    // const posts = await Post.find({ author: { $in: user.follows } }).populate("author").sort({ time: -1 })

    // if (posts) {
    //     posts.forEach(post => {
    //         // post.time = 1647184126618
    //         post.timeDisplay = calculateTime(post.time) || post.createdAt.toString().slice(0, 15)
    //     })
    //     res.status(200).json(posts)
    // }
})

postRouter.get("/:id", async (req, res) => {
    postController.getSinglePostWithComments(req, res)
    // const { id } = req.params
    // const post = await Post.findOne({ _id: id }).populate("author", "username")
    //     .populate({
    //         path: "comments",
    //         populate: {
    //             path: "author",
    //             select: "username profile.firstName profile.lastName"
    //         },
    //         options: {
    //             sort: { time: -1 }
    //         }
    //     })

    // if (post) {
    //     res.status(200).json(post)
    // } else {
    //     res.sendStatus(400)
    // }
})


postRouter.get("/:tag", async (req, res) => {
    postController.getPostsByTag(req, res)
    // const { tag } = req.params
    // const posts = await Post.find({ tags: tag }).populate("author").sort({ time: -1 })
    // if (posts) {
    //     posts.forEach(post => {
    //         // post.time = 1647184126618
    //         post.timeDisplay = calculateTime(post.time) || post.createdAt.toString().slice(0, 15)
    //     })
    //     res.status(200).json(posts)
    // } else {
    //     res.status(400).json({ message: "No posts found" })
    // }
})

postRouter.get("/:id/like", verifyToken, async (req, res) => {
    postController.likePost(req, res)
    // const { id } = req.params
    // const post = await Post.findOne({ _id: req.params.id })
    // const userId = req.user.id
    // if (post && !post.likes.includes(userId)) {
    //     post.likes.push(userId)
    //     await post.save()
    // }

    // res.sendStatus(200)
})

postRouter.get("/:id/unlike", verifyToken, async (req, res) => {
    postController.unlikePost(req, res)
    // const { id } = req.params
    // const post = await Post.findOne({ _id: id })
    // const userId = req.user.id

    // if (post && post.likes.includes(userId)) {
    //     post.likes.pop(userId)
    //     await post.save()
    // }

    // res.sendStatus(200)
})

postRouter.post("/:id/comment", verifyToken, checkEmptyFields, async (req, res) => {
    postController.commentPost(req, res)
    // const postId = req.params.id
    // const userId = req.user.id
    // const { text } = req.body
    // const post = await Post.findOne({ _id: postId })
    // const comment = new Comment({
    //     author: userId,
    //     text,
    //     time: Date.now()
    // })
    // post.comments.push(comment._id)
    // await comment.save()
    // await post.save()
    // res.sendStatus(200)
})

module.exports = postRouter