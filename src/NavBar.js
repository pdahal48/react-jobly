import React from "react";
import { Navbar, Nav } from "react-bootstrap";

 
const NavBar = ({ user })  => {
  return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand className="active" href="/">Jobly</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      </Nav>
      <Nav>
      <Nav.Link href="/companies">Companies</Nav.Link>
      <Nav.Link href="/jobs">Jobs</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="/Logout">Logout {user}</Nav.Link>
    </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}
  

export default NavBar;
