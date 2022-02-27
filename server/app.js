const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const userRoutes = require("./routes/userRoutes")
const routes = require("./routes")
const postRoutes = require("./routes/postRoutes")
const PORT = 3001

mongoose.connect("mongodb://127.0.0.1:27017/micro-blog")
    .then(() => {
        const app = express()

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use("/profileImages", express.static(path.join(__dirname, "/profileImages")))
        app.use(cors())
        app.use("/api/user", userRoutes)
        app.use("/api/posts", postRoutes)
        app.use("/api", routes)

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log("Couldn't connect to mongo: ", err)
    })