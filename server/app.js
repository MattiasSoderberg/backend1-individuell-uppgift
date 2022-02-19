const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
require("dotenv").config()

const userRoutes = require("./routes/userRoutes")
const routes = require("./routes")
const PORT = 3001

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => {
        const app = express()

        app.use(methodOverride("_method"))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.json())
        app.use("/profileImages", express.static(path.join(__dirname, "/profileImages")))
        app.use(cors())
        app.use("/api/user", userRoutes)
        app.use("/api", routes)

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log("Couldn't connect to mongo: ", err)
    })