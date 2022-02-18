const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { comparePassword } = require("../helpers")

module.exports = {
    verifyUserName: async (req, res, next) => {
        const userName = req.body.userName.toLowerCase()
        const user = await User.findOne({ userName })

        if (user) {
            res.status(403).json({ message: "Username already exists" })
        } else {
            next()
        }
    },
    verifyToken: async (req, res, next) => {
        const bearerHeader = req.headers["authorization"]
        const bearer = bearerHeader.split(" ")[0]
        const token = bearerHeader.split(" ")[1]
        
        if (token && bearer === "Bearer") {
            jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
                if (err) {
                    res.status(403).json(err)
                } else {
                    req.userName = authData
                    next()
                }
            })
        } else {
            res.status(403).json({ message: "Invalid token or bearer"})
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
                res.status(403).json({ message: "Incorrect username or password"})
            }
        } else {
            res.status(403).json({ message: "Incorrect username or password"})
        }  
    }
}