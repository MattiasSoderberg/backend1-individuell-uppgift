const { getAllTags } = require("../models/Tag")
const { getAllPosts } = require("../models/Post")

const tagController = {
    getAllTags: async (req, res) => {
        const tags = await getAllTags()
        res.status(200).json(tags)
    },
    getPostsByTag: async (req, res) => {
        const posts = await getAllPosts({ tags: req.params.tag })
        if (posts) {
            res.status(200).json(posts)
        } else {
            res.status(400).json({ message: "No posts found" })
        }
    }
}

module.exports = { tagController }