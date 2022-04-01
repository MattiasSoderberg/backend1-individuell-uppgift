const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
const { TokenBlacklist } = require("../models/TokenBlacklist")
const { comparePassword } = require("../helpers")

module.exports = {
    verifyUsername: async (req, res, next) => {
        const username = req.body.username.toLowerCase()
        const user = await User.findOne({ username })

        if (user) {
            res.status(403).json({ message: "Username already exists" })
        } else {
            next()
        }
    },
    verifyToken: async (req, res, next) => {
        const bearerHeader = req.headers["authorization"]
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ")[0]
            const token = bearerHeader.split(" ")[1]
            const blacklistedToken = await TokenBlacklist.findOne({ token })

            if (token && bearer === "Bearer" && !blacklistedToken) {
                jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
                    if (err) {
                        res.status(403).json(err)
                    } else {
                        req.user = authData
                        next()
                    }
                })
            } else {
                res.status(403).json({ message: "Invalid token or bearer" })
            }
        }
    },
    verifyLogin: async (req, res, next) => {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })

        if (user) {
            const passwordIsValid = await comparePassword(password, user.password)
            if (passwordIsValid) {
                next()
            } else {
                res.status(403).json({ message: "Incorrect username or password" })
            }
        } else {
            res.status(403).json({ message: "Incorrect username or password" })
        }
    },
    checkEmptyFields: (req, res, next) => {
        let fieldsValid = true
        Object.values(req.body).forEach(value => {
            if (!value) {
                fieldsValid = false
            }
        })
        if (fieldsValid) {
            next()
        } else {
            res.status(400).json({ message: "All fields requiered" })
        }
    },
    checkPostLength: (req, res, next) => {
        const { text } = req.body
        if (text.length > 140) {
            res.status(400).json({ message: "Text can be max 140 characters" })
        } else {
            next()
        }
    }
}