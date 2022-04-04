const express = require("express")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const { getAllUsers } = require("./models/User")
const Tag = require("./models/Tag")
const router = express.Router()
const { hashPassword } = require("./helpers")
const { verifyUserName, verifyLogin, verifyToken } = require("./middlewares/validation")

router.get("/users", verifyToken, async (req, res) => {
    const users = await getAllUsers()

    res.status(200).json(users)
})

module.exports = router