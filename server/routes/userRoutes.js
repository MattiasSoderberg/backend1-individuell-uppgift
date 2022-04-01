const express = require("express")
const multer = require("multer")
const upload = multer({ dest: "profileImages/" })
const { calculateTime } = require("../helpers")
const userRouter = express.Router()
const { userController } = require("../controllers/userController")
const { verifyUsername, verifyToken, checkEmptyFields } = require("../middlewares/validation")


userRouter.get("/me", verifyToken, async (req, res) => {
    userController.getLoggedInUser(req, res)
})

userRouter.patch("/me", verifyToken, upload.single("imageFile"), async (req, res) => {
    userController.updateLoggedInUser(req, res)
})

userRouter.post("/create", checkEmptyFields, verifyUsername, async (req, res) => {
    userController.createNewUser(req, res)
})

userRouter.post("/login", checkEmptyFields, async (req, res) => {
    userController.login(req, res)
})

userRouter.get("/logout", verifyToken, async (req, res) => {
    userController.logout(req, res)
})

userRouter.get("/:username", async (req, res) => {
    userController.getUserByName(req, res)
})

userRouter.get("/:id/follow", verifyToken, async (req, res) => {
    userController.followUser(req, res)
})

userRouter.get("/:id/unfollow", verifyToken, async (req, res) => {
    userController.unFollowUser(req, res)
})

module.exports = userRouter