import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
          <Nav.Link as={Link} to="/trainings">Trainings</Nav.Link>
          {/* Add more Nav.Link items here */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
