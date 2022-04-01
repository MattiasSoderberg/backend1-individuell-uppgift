const jwt = require("jsonwebtoken")
const { getUser, login, createUser, updateUser, followUser, unFollowUser } = require("../models/User")
const { insertToken } = require("../models/TokenBlacklist")

const JWT_SECRET = process.env.JWT_SECRET

const userController = {
    getLoggedInUser: async (req, res) => {
        const user = await getUser(req.user.username)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "No user found" })
        }
    },
    updateLoggedInUser: async (req, res) => {
        const { file } = req
        const profile = {}

        Object.entries(req.body).forEach(entry => {
            if (entry[1]) {
                profile[entry[0]] = entry[1]
            }
        })

        if (file) {
            profile.image = {
                mimetype: file.mimetype,
                url: file.path
            }
        }

        const user = await updateUser(req.user.username, profile)

        if (user) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    },
    login: (req, res) => {
        const { username, password } = req.body
        const user = login(username.toLowerCase(), password)
        if (user) {
            jwt.sign({ username, id: user._id }, JWT_SECRET, (err, token) => {
                if (err) {
                    res.status(401).json(err)
                } else {
                    res.status(200).json({ token })
                }
            })
        } else {
            res.status(401).json({ message: "Incorrect username or password" })
        }
    },
    logout: async (req, res)  => {
        const token = await insertToken(req.headers.authorization.split(" ")[1])
        if (token) {
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }
    },
    createNewUser: async (req, res) => {
        const user = req.body
        const newUser = await createUser(user)

        if (newUser) {
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }
    },
    getUserByName: async (req, res) => {
        const user = await getUser(req.params.username)

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "No user found" })
        }
    },
    followUser: async (req, res) => {
        const userId = req.params.id
        const followingUser = req.user.username
        const result = await followUser(userId, followingUser)
        if (result) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    },
    unFollowUser: async (req, res) => {
        const userId = req.params.id
        const followingUser = req.user.username
        const result = await unFollowUser(userId, followingUser)
        if (result) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
}

module.exports = { userController }