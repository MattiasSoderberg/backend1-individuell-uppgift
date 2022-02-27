const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const path = require("path")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const User = require("../models/User")
const Post = require("../models/Post")
const TokenBlacklist = require("../models/TokenBlacklist")
const userRouter = express.Router()
const { hashPassword } = require("../helpers")
const { verifyUsername, verifyLogin, verifyToken, checkEmptyFields } = require("../middlewares/validation")


// Requires header auth
userRouter.get("/me", verifyToken, async (req, res) => {
    
    const user = await User.findOne({ _id: req.user.id })

    if (user) {
        const posts = await Post.find({ author: user._id }).sort({ time: -1 })
        res.status(200).json({ user, posts })
    } else {
        res.status(400).json({ message: "Not found" })
    }
})

// Requires header auth
userRouter.patch("/me", verifyToken, upload.single("imageFile"), async (req, res) => {
    try {
        const username = req.username
        const { file } = req
        const user = await User.findOne({ username })

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
userRouter.post("/create", verifyUsername, checkEmptyFields, async (req, res) => {
    const {firstName, lastName, password} = req.body
    const username = req.body.username.toLowerCase()
    const user = new User({
        firstName,
        lastName,
        username,
        password
    })
    await user.save()
    res.status(201).json({ message: "User created" })
})

// username and password
userRouter.post("/login", checkEmptyFields, async (req, res) => {
    const { username, password } = req.body
    const user = await User.login(username, password)
    if (user) {
        jwt.sign({username, id: user._id.toString()}, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                res.status(401).json(err)
            } else {
                res.status(200).json({ token })
            }
        })
    } else {
        res.status(401).json({ message: "Incorrect username or password" })
    }
})

userRouter.get("/logout", verifyToken, async (req, res) => {
    const activeToken = req.headers.authorization.split(" ")[1]

    const blacklist = await TokenBlacklist.find()
    if (await TokenBlacklist.find().length === 0) {
        console.log("hej")
        res.status(200).json({ message: "Logged out" })
    } else {
        res.status(400).json({ message: "Something went wrong" })
    }

    // console.log(blacklist)


})

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id.toString()
    const user = await User.findOne({ _id: id })
    if (user) {
        const posts = await Post.find({ author: user._id })
        const returnData = {
            firstName: user.firstName,
            lastName: user.lastName,
            profile: user.profile,
            posts
        }
        res.status(200).json(returnData)
    } else {
        res.status(400).json({ message: "No user found" })
    }


})

userRouter.get("/:id/follow", verifyToken, async (req, res) => {
    const { id } = req.params
    const username = req.username
    const user = await User.findById({ _id: id })
    const followingUser = await User.findOne({ username })
    followingUser.follows.push(user._id)
    user.followers.push(followingUser._id)
    await followingUser.save()
    await user.save()
    res.status(201).json({ message: `Following user ${user._id}` })
})

module.exports = userRouter