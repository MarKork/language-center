import React from 'react';
import '../App.css';

const Footer = () => {
    

  return (
    <footer className="footer">
          <hr/>
          <div className="row">
            <div className="col-1" id="first"></div>
            <div className="col-2">
              <h4 id="our-name">Language <br/>Center</h4>
            </div>
            <div className="col-2">
              <h4>About Us</h4>
              <p>Our story</p>
              <p>News</p>
            </div>
            <div className="col-3">
              <h4>Legal</h4>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
            <div className="col-2">
              <h4>Contact</h4>
              <p>Contact Us</p>
              <p>Help Center</p>
              
            </div>
            <div className="col-1">
              <i className="fab fa-facebook-f"></i><br/>
              <i className="fab fa-twitter"></i><br/>
              <i className="fab fa-instagram"></i>
            </div>
            <div className="col-1"></div>
          </div>
    </footer>
  )
}

export default Footer;