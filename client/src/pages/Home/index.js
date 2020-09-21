import React from 'react'
import './home.css';
import frontpageImg from './frontpage.jpg';

const Home = () => {

    return(
        <>
            <div className="top-image"> 
                <img src={frontpageImg} id="frontImg" alt="frontpage"></img>
                <div className="centered"><h1>Welcome to learn languages with us</h1></div>
            </div>
            <p id="course-info">All our courses are online so you can study where ever you want.</p>
            <p>Our excellent teachers are dedicated to teaching you. </p>
        </>
    )
}

export default Home