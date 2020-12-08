import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './sidebar.scss';

function Menu() {
  return (
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Link to="/"><Nav.Link href="/">Home</Nav.Link></Link>
        <Link to="/contact"><Nav.Link href="/contact">Contact</Nav.Link></Link>
      </Nav>
    </Navbar>
  );
}

export default Menu;
