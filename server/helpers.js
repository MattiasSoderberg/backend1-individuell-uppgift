const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = {
    hashPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) reject(err)

                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) reject(err)
                    else resolve(hash)
                })
            })
        })
    },
    comparePassword: (password, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })

    },
    calculateTime: (createdAt) => {
        const currentTime = Date.now()

        if ((currentTime - createdAt) / 1000 < 60) return `${Math.round((currentTime - createdAt) / 1000)} seconds ago` // Seconds
        else if ((currentTime - createdAt) / 1000 / 60 < 60) return `${Math.round((currentTime - createdAt) / 1000 / 60)} minutes ago` // Minutes
        else if ((currentTime - createdAt) / 1000 / 3600 < 24) return `${Math.round((currentTime - createdAt) / 1000 / 3600)} hours ago` // Hours
        else if ((currentTime - createdAt) / 1000 / 3600 / 24 < 7) return `${Math.round((currentTime - createdAt) / 1000 / 3600 / 24)}` // Days
    }
}