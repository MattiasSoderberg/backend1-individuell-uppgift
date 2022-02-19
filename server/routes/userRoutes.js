const express = require("express")
const jwt = require("jsonwebtoken")
const path = require("path")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const User = require("../models/User")
const userRouter = express.Router()
const { hashPassword } = require("../helpers")
const { verifyUserName, verifyLogin, verifyToken } = require("../middlewares/validation")

// require("dotenv").config()

// Requires header auth
userRouter.get("/me", verifyToken, async (req, res) => {
    const userName = req.userName
    const user = await User.findOne({ userName })
    res.status(200).json(user)
})

// Requires header auth
userRouter.patch("/me", verifyToken, upload.single("imageFile"), async (req, res) => {
    try {
        const userName = req.userName
        const { file } = req
        const user = await User.findOne({ userName })
    
        if (req.body) {
            user.profile = req.body
        }
        if (file) {
            console.log(file)
            user.profile.image = {
                mimetype: file.mimetype,
                url: file.path
            }
        }
    
        await user.save()
        res.status(200).json({ message: "kanon!" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// Creates a user
userRouter.post("/create", verifyUserName, async (req, res) => {
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
userRouter.post("/login", verifyLogin, async (req, res) => {
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

userRouter.post("/logout", verifyToken, async (req, res) => {
    const userName = req.userName
    const user = await User.findOne({ userName })

    user.isLoggedIn = false
    await user.save()
    
    res.status(200).json({ message: "Logged out" })
})

module.exports = userRouter