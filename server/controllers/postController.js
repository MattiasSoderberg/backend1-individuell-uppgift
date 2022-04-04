const { getAllPosts, createPost, getPostById } = require("../models/Post")
const { getUser } = require("../models/User")
const { insertTags } = require("../models/Tag")
const { createComment } = require("../models/Comment")
const { findTags, modifyNewTags } = require("../helpers")

const postController = {
    getPosts: async (req, res) => {
        const posts = await getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        }
    },
    createPost: async (req, res) => {
        const { username } = req.user
        const { text } = req.body
        if (username) {
            const user = await getUser(username)
            if (text) {
                const post = {
                    text,
                    author: user._id,
                    tags: findTags(text)
                }
                if (post.tags) {
                    const newTags = await modifyNewTags(post.tags)
                    if (newTags) {
                        await insertTags(newTags)
                    }
                }
                const newPost = await createPost(post)
                user.posts.push(newPost._id)
                await user.save()
                res.sendStatus(201)
            } else {
                res.send(400).json({ message: "Post cannot be empty" })
            }
        } else {
            res.send(400).json({ message: "User not found" })
        }
    },
    getSinglePostWithComments: async (req, res) => {
        const post = await getPostById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "No post found" })
        }
    },
    getPostByFollows: async (req, res) => {
        const user = await getUser(req.user.username)
        if (user) {
            const posts = await getAllPosts({ author: { $in: user.follows } })
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(400).json({ message: "No posts found" })
            }
        } else {
            res.status(400).json({ message: "No user found" })
        }
    },
    likePost: async (req, res) => {
        const userId = req.user.id
        const post = await getPostById(req.params.id)
        if (post && !post.likes.includes(userId)) {
            post.likes.push(userId)
            await post.save()
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    },
    unlikePost: async (req, res) => {
        const userId = req.user.id
        const post = await getPostById(req.params.id)
        if (post && post.likes.includes(userId)) {
            post.likes.pull(userId)
            await post.save()
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    },
    commentPost: async (req, res) => {
        const post = await getPostById(req.params.id)
        const comment = await createComment({
            author: req.user.id,
            text: req.body.text
        })
        post.comments.push(comment._id)
        await post.save()
        await comment.save()
        res.sendStatus(200)
    },
    getPostsByTag: async (req, res) => {
        const { tag } = req.params
        const posts = await getAllPosts()
        if (posts) {
            res.status(200).json(posts)
        }
    }
}

module.exports = { postController }