import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
/*import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';  */

import Auth from '../utils/auth';



  const Navbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);
  
    return (
    
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
              <Nav className='ml-auto'>
                <Nav.Link as={Link} to='/'>
                  Search For Lyrics
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        )}





