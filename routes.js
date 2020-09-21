// Import required packages 
const express = require('express')
const multer = require('multer')

// Import controllers and config files
const verifyToken = require('./config/verifyToken')
const UserController = require('./controllers/UserController')
const CourseController = require('./controllers/CourseController')
const RegistrationController = require('./controllers/RegistrationController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
//const uploadConfig = require('./config/upload')
const uploadToS3 = require('./config/S3Upload')

// Creating instances
// Define middleware which allows us to route from different file
const routes = express.Router()
// Multer instance of our upload config to use functionality
//const upload = multer(uploadConfig)

// Define routes using express' Router method
// Checking if app is running fine
routes.get('/status', (req, res)=> {
    res.send({ status: 200 })
})

// User
// Registering 
routes.post('/user/register', UserController.createUser)

// Getting user By ID
routes.get('/user/:userId', UserController.getUserById)

// Course
// Course creation end point
routes.post('/course', uploadToS3.single("thumbnail") ,CourseController.createCourse)
// Deleting course by ID
routes.delete('/course/:courseId', CourseController.delete)

// Dashboard
// Getting all events
routes.get('/dashboard', DashboardController.getCourses)
// Getting events by category
routes.get('/dashboard/:language', DashboardController.getCourses)
// Getting events with ID using function called getEventById from EventController
routes.get('/course/:courseId', DashboardController.getCourseById)

// Login
routes.post('/login', LoginController.store)

// Registration
//Creating a new course
routes.post('/registration/:courseId', verifyToken, RegistrationController.createRegistration )
//Getting the registrations for courses of a logged user
routes.get('/registration', verifyToken, RegistrationController.getMyRegistrations)
//Deleting a registration
routes.delete('/registration/:registrationId', verifyToken, RegistrationController.delete)


// Export routes
module.exports = routes