const express = require("express")
const { tagController} = require("../controllers/tagController")

const tagRouter = express.Router()

tagRouter.get("/", async (req, res) => {
    tagController.getAllTags(req, res)
})

tagRouter.get("/:tag", async (req, res) => {
    tagController.getPostsByTag(req, res)
})

module.exports = tagRouter