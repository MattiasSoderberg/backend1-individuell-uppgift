const express = require("express")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const User = require("./models/User")
const router = express.Router()
const { hashPassword } = require("./helpers")
const { verifyUserName, verifyLogin, verifyToken } = require("./middlewares/validation")

require("dotenv").config()

// Requires header auth
router.get("/user/me", verifyToken, async (req, res) => {
    const userName = req.userName
    const user = await User.findOne({ userName })
    res.status(200).json(user)
})

// Requires header auth
router.patch("/user/me", verifyToken, async (req, res) => {
    const userName = req.userName
    const user = await User.findOne({ userName })

    user.profile = req.body
    user.profile.imageUrl = "/profileImages/"

    console.log(user)
})

router.get("/users", verifyToken, async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
})

// Creates a user
router.post("/user/create", verifyUserName, async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body
        const user = new User({
            firstName,
            lastName,
            userName,
            password,
            loggedIn: false
        })
        if (password) {
            const hashedPassword = await hashPassword(password)
            user.password = hashedPassword
        }
        if (userName) {
            user.userName = userName.toLowerCase()
        }
        await user.save()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// Username and password
router.post("/user/login", verifyLogin, async (req, res) => {
    const { userName } = req.body
    const user = await User.findOne({ userName })
    jwt.sign(user.userName, process.env.JWT_SECRET, async (err, token) => {
        if (err) {
            res.status(403).json(err)
        } else {
            user.isLoggedIn = true
            await user.save()
            res.status(200).json({ token })
        }
    })
})

router.post("/user/logout", verifyToken, async (req, res) => {
    const userName = req.userName
    const user = await User.findOne({ userName })

    user.isLoggedIn = false
    await user.save()
    
    res.status(200).json({ message: "Logged out" })
})

module.exports = router