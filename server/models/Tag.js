const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    tag: {type: String, unique: true}
})

const Tag = mongoose.model("Tag", tagSchema)

const getTags = async (tags) => {
    return await Tag.find({ tag: { $in: tags } })
}
const insertTags = async (tags) => {
    return await Tag.insertMany(tags)
}

module.exports = { insertTags, getTags }