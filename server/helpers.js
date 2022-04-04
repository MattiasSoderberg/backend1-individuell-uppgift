const { getTags } = require("./models/Tag")

module.exports = {
    calculateTime: (createdAt) => {
        const currentTime = Date.now()

        if ((currentTime - createdAt) / 1000 < 60) return `${Math.round((currentTime - createdAt) / 1000)} seconds ago` // Seconds
        else if ((currentTime - createdAt) / 1000 / 60 < 60) return `${Math.round((currentTime - createdAt) / 1000 / 60)} minutes ago` // Minutes
        else if ((currentTime - createdAt) / 1000 / 3600 < 24) return `${Math.round((currentTime - createdAt) / 1000 / 3600)} hours ago` // Hours
        else if ((currentTime - createdAt) / 1000 / 3600 / 24 < 7) return `${Math.round((currentTime - createdAt) / 1000 / 3600 / 24)} days ago` // Days
    },
    findTags: (text) => {
        const regex = /#[\p{L}0-9]*/igu
        const tags = text.match(regex)
        if (tags) {
            const trimedTags = tags.map(tag => tag.substring(1))
            return trimedTags
        } else {
            return []
        }
    },
    modifyNewTags: async (tags) => {
        const existingTags = await getTags(tags)
        const nonExistingTags = tags.filter(tag => existingTags.every(existingTag => existingTag.tag !== tag))
        const objectifiedTags = nonExistingTags.map(tag => ({ tag }))
        return objectifiedTags
    }
}