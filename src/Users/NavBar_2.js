import React from "react";
import { Navbar, Nav } from "react-bootstrap";

 
const NavBar_2 = ()  => {
  return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand className="active" href="/">Jobly</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      </Nav>
      <Nav>
      <Nav.Link href="/Login">Login</Nav.Link>
      <Nav.Link href="/SignUp">SignUp</Nav.Link>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}
  

export default NavBar_2;
