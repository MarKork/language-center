const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: String,
    description_short: String,
    description_long: String,
    category: String,
    language: String,
    price: Number,
    thumbnail: String, 
    date: Date,
    length: String,
    
}, {
    toJSON: {
        virtuals: true
    }
})

CourseSchema.virtual("thumbnail_url").get(function () {
    return this.thumbnail
})

module.exports = mongoose.model('Course', CourseSchema)