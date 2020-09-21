import React, {useState, useEffect} from 'react'
import { Alert, Button } from 'reactstrap'

import api from '../../services/api'
import './style.css'

export default function MyCourses() {
    const [myCourses, setMyCourses] = useState([])
    const user = localStorage.getItem('user')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')

    useEffect(() => {
        getMyCourses()
    }, [])

    const getMyCourses = async() => {
        try {
            const response = await api.get('/registration', {headers: {user}})
            setMyCourses(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    const goToPayHandler = () =>{
        window.alert("This is not implemented")
    }

    const deleteHandler = async (registrationId) =>{
        try {
            await api.delete(`/registration/${registrationId}`)
            setSuccess(true)
            setMessageHandler('Registration deleted successfully')
            setTimeout(() => {
                setSuccess(false)
                setMessageHandler('')
            }, 2000);
        } catch(error) {
            setError(true)
            setMessageHandler('Error deleting registration!')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000);
        }
    }
    
    return (
        <>
        <h2>My courses</h2>
        <table responsive="true" className="myCourses p-3">
            {myCourses.map(course => (
                <tbody key={course._id}>
                    <tr>
                    <td><strong>{course.courseTitle}</strong></td>
                    <td><span> Course Price: {parseFloat(course.coursePrice).toFixed(2)} €</span></td>
                    <td><Button onClick={()=> {deleteHandler(course._id)}}>Delete</Button></td>
                    </tr>
                </tbody>
                
            ))}
        
        </table>
            {error ? (
                    <Alert color="danger" className="event-validation">{messageHandler}</Alert>
                ) : ''}
                {success ? (
                    <Alert color="success" className="event-validation"> {messageHandler} </Alert>
                ) : ''}
            <Total courses={myCourses}/>
            <Button onClick={()=> {goToPayHandler()}}>Go to pay</Button>
        </>
    )
}

const Total = ({courses}) => {
    let total=0
    courses.map(course =>(
        total=Number(total)+Number(course.coursePrice))
    )
    
    return(
        <h3>Total: {parseFloat(total).toFixed(2)} €</h3>
    )
}
