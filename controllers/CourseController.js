const Course = require('../models/Course')

module.exports = {
    async createCourse(req, res) {
        const { title, description_short, description_long, price, category, language, date, length } = req.body
        const { location } = req.file

        const course = await Course.create({
            title,
            description_short,
            description_long,
            category,
            language,
            price: parseFloat(price),
            thumbnail: location,
            length,
            date
        })

        return res.json(course)
    },

    async delete(req, res) {
        const { courseId } = req.params
        try {
            await Course.findByIdAndDelete(courseId)
            return res.status(204).send()
        } catch(error) {
            return res.status(400).json({
                message: "We do not have any course with the ID"
            })
        }
    }

}