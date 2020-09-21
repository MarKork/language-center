import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, CardImg, CardText, CardBody, 
    CardTitle, CardDeck, Col, Row} from 'reactstrap'
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/api'
import moment from 'moment'
import './coursespage.css';

const CoursesPage = ({history}) => {
    const user = localStorage.getItem('user')
    const [courses, setCourses] = useState([])
    const [languageName, setLanguageName] = useState(null)
    const location = useLocation();
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [selected, setSelected] = useState(null)
    
    useEffect (() => {
        getCourses()
    }, [location])

    const getCourses = async() => {
        const currentPath = location.pathname;
        let language=''
        if(currentPath.length>10&&currentPath.length<25){
            let newName=currentPath.slice(9)
            newName.trim()
            setLanguageName(newName) 
            language=newName  
        }
        if(currentPath.length>25){
            let course_id=currentPath.slice(9)
            const url =  `/course/${course_id}` 
            const response = await api.get(url)
            setSelected(response.data)
        }
        
        try {
            const url = language? `/dashboard/${language}` : '/dashboard'
            const response = await api.get(url)
            setCourses(response.data)
        } catch (error){
            setError(true)
            setMessageHandler(`Could not found courses`)
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000);
        }
        
    }

    const registrationRequestHandler = async(course) => {
        if(user){

        try {
            let myCourses=[]
            try {
                const response = await api.get('/registration', {headers: {user}})
                myCourses=response.data
                let id = course._id
                let found = myCourses.find(registration => registration.course === id)
                if(found===undefined){
                    await api.post(`/registration/${course.id}`, {}, {headers: {user}})
                    setSuccess(true)
                    setMessageHandler(`Successfully registered to course ${course.title}`)
                    setTimeout(() => {
                        setSuccess(false)
                        setMessageHandler('')
                    }, 2000);
                }
                else{
                    setError(true)
                    setMessageHandler(`You already registered to this course.`)
                    setTimeout(() => {
                        setError(false)
                        setMessageHandler('')
                    }, 2000);
                }
            } catch(error) {
                setError(true)
                setMessageHandler(`Could not register to course ${course.title}`)
                setTimeout(() => {
                    setError(false)
                    setMessageHandler('')
                }, 2000);
            }

        } catch(error) {
            setError(true)
            setMessageHandler(`Could not register to course ${course.title}`)
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000);
        }
        }else{
            history.push('/login')
        }
    }

    const courseSelectionHandler = (course) => {
        if(!selected){
            console.log("not selected")
        }
        setSelected(course)
    }
    
    if(!selected){
        return(
            <>
                <h2>Our {languageName} courses</h2>
                {error ? (
                    <Alert color="danger" className="event-validation">{messageHandler}</Alert>
                ) : ''}
                {success ? (
                    <Alert color="success" className="event-validation"> {messageHandler} </Alert>
                ) : ''}

                <Row>
                <CardDeck>
                {courses.map(course => 
                    <Col sm="4" key={course._id}>
                        <Card className="card" onClick={()=> {courseSelectionHandler(course)}}>
                            <Link to={`/courses/${course.id}`}> 
                                <CardImg top width="100%" id="card-img" src={course.thumbnail_url} alt="Card image cap" />
                            </Link>
                            <CardBody>
                                <CardTitle><strong>{course.title}</strong></CardTitle>
                                <CardText>{course.description_short}<br/>Price: {parseFloat(course.price).toFixed(2)} €<br/>Course begins: {moment(course.date).format('DD.MM.YYYY')}</CardText>
                                <Button className="submit-btn" onClick={()=> {registrationRequestHandler(course)}}>Register</Button>
                            </CardBody>
                        </Card>
                    </Col>
                )}
                </CardDeck>
                </Row>
        
            </>
        )
    }else{
        return(
            <>
                <div id="one_course">
                    <img src={selected.thumbnail_url} alt="thumbnail"></img>
                    <div id="course_info">
                        <h2>{selected.title}</h2>
                        <p>{selected.description_long}</p>
                        <p>The course begins: {moment(selected.date).format('DD.MM.YYYY')}</p>
                        <p>The length of course is {selected.length}</p>
                        <p>Price: {parseFloat(selected.price).toFixed(2)} €</p>
                        <Button className="submit-btn" onClick={()=> {registrationRequestHandler(selected)}}>Register</Button>
                    </div>
                
                </div>
                {error ? (
                    <Alert color="danger" className="event-validation">{messageHandler}</Alert>
                ) : ''}
                {success ? (
                    <Alert color="success" className="event-validation"> {messageHandler} </Alert>
                ) : ''}
            </>
        )
    }
    
}

export default CoursesPage