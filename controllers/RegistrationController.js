const Registration = require('../models/Registration')
const jwt = require('jsonwebtoken')

module.exports = {
    createRegistration (req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err) {
                res.sendStatus(401)
            } else {
                // const { user_id } = req.headers
                const user_id = authData.user._id
                const { courseId } = req.params
        
                const registration = await Registration.create({
                    user: user_id,
                    course: courseId,
                })
        
                await registration
                    .populate('course')
                    .populate('user', '-password')
                    .execPopulate()

                registration.courseTitle = registration.course.title
                registration.coursePrice = registration.course.price
                registration.courseDate = registration.course.date
                registration.save()

                return res.json(registration)
            }
        })
    },


    getMyRegistrations(req, res) {
        jwt.verify(req.token, 'secret', async(err, authData) => {
            if(err) {
                res.sendStatus(401)
            } else {
                try {
                    const registrationArr = await Registration.find({"user" : authData.user})
                    if(registrationArr) {
                        return res.json(registrationArr)
                    }
                } catch(error) {
                    console.log(error)
                }
            }
        })
    },

    delete(req, res){
        jwt.verify(req.token, 'secret', async(err) =>{
            if(err){
                res.statuscode(401)
            }else{
                const {registrationId} =req.params
                try{
                    await Registration.findByIdAndDelete(registrationId)
                    return res.status(204).send()
                }catch(error){
                    return res.status(400).json({
                        message: "We do not have any registration with the ID"
                    })
                }
            }
        })
    }
}