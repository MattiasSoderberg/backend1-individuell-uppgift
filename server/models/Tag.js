const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    tag: {type: String, unique: true}
})

const Tag = mongoose.model("Tag", tagSchema)

const getAllTags = async () => {
    return await Tag.find()
}

const insertTags = async (tags) => {
    return await Tag.insertMany(tags)
}

module.exports = { insertTags, getAllTags }