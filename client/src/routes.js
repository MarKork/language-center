import React, { useState, useContext } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Nav, Navbar, NavItem, NavbarToggler, Collapse} from 'reactstrap'
import { UserContext } from './user-context'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MyCourses from './pages/MyCourses'
import CoursesPage from './pages/CoursesPage'
import Footer from './components/Footer' 

import './App.css';

export default Routes => {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    setIsLoggedIn(false)
  }
    
  const toggle = () => setIsOpen(!isOpen);
  
    return (
      <BrowserRouter>
        <h1><a href="/" id="main_heading">Language Center</a></h1>

        <Navbar expand="md" className="navbar navbar-light">
          <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/courses">All courses</Link>
              </NavItem>
              <NavItem>
                <Link to="/courses/Italian">Italian</Link>
              </NavItem>
              <NavItem>
                <Link to="/courses/French">French</Link>
              </NavItem>
              <NavItem>
                <Link to="/courses/Spanish">Spanish</Link>
              </NavItem>
              {isLoggedIn? 
                <NavItem>
                  <Link to="/" onClick={logoutHandler}>Logout</Link>
                </NavItem>
              :
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
              }
              {isLoggedIn? 
                <NavItem>
                  <Link to="/mycourses">My Courses</Link>
                </NavItem>
              :
                <NavItem>
                  <Link to="/register">Register</Link>
                </NavItem>
              }
            </Nav>
            </Collapse>
        </Navbar>

        <Switch>
          <Route exact path='/mycourses' component={MyCourses} />
          <Route exact path='/courses' component={CoursesPage} />
          <Route exact path='/courses/:language' component={CoursesPage} />
          <Route exact path='/courses/:id' component={CoursesPage} />
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Home}/>
        </Switch>

        <Footer />
        
      </BrowserRouter>
        
    )
}