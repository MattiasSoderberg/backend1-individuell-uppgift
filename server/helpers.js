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

    }
}