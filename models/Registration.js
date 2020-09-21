const mongoose = require('mongoose')

const RegistrationSchema = new mongoose.Schema({
    date: () => Date.now(),
    courseTitle: String,
    coursePrice: String,
    courseDate: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
})

module.exports = mongoose.model('Registration', RegistrationSchema)