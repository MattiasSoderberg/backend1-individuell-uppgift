const express = require("express")
const { verifyToken, checkPostLength, checkEmptyFields } = require("../middlewares/validation")
const { postController } = require("../controllers/postController")

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    postController.getPosts(req, res)
})

postRouter.post("/", verifyToken, checkPostLength, async (req, res) => {
    postController.createPost(req, res)
})

postRouter.get("/follows", verifyToken, async (req, res) => {
    postController.getPostByFollows(req, res)
})

postRouter.get("/:id", async (req, res) => {
    postController.getSinglePostWithComments(req, res)
})

postRouter.get("/:id/like", verifyToken, async (req, res) => {
    postController.likePost(req, res)
})

postRouter.get("/:id/unlike", verifyToken, async (req, res) => {
    postController.unlikePost(req, res)
})

postRouter.post("/:id/comment", verifyToken, checkEmptyFields, async (req, res) => {
    postController.commentPost(req, res)
})

module.exports = postRouter