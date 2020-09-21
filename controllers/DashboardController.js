const Course = require('../models/Course')

module.exports = {
    async getCourses(req, res) {
        const { language } = req.params
        const query = language? {language} : {}
        
        try {
            const courses = await Course.find(query)
            if(courses) {
                return res.json(courses)
            }
        } catch(error) {
            return res.status(400).json({	
                message: " We do not have any courses to show"	
            })	
        }	
    },
    
    async getCourseById (req, res) {
        const { courseId } = req.params
        try{
            const course = await Course.findById(courseId)
            return res.json(course)
        }catch(error) {
            return res.status(400).json({
                message: 'Course ID does not exist!'
            })
        }
    }

}