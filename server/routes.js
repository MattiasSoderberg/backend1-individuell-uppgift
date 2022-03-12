const express = require("express")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const User = require("./models/User")
const Tag = require("./models/Tag")
const router = express.Router()
const { hashPassword } = require("./helpers")
const { verifyUserName, verifyLogin, verifyToken } = require("./middlewares/validation")

router.get("/users", verifyToken, async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
})

router.get("/tags", verifyToken, async (req, res) => {
    const tags = await Tag.find()

    res.status(200).json(tags)
})

module.exports = router