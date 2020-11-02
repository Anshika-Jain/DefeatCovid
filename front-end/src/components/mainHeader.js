import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import { AuthContext } from "./context/auth-context";

export default function MainHeader() {
  const auth = useContext(AuthContext);
  return (
    <Navbar
      className="nav-bar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand className="nav-brand" href="/">
        HOME
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {auth.isLoggedIn && (
            <Nav.Link className="navbar-link" href="/post/createPost">
              Create Post
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          {!auth.isLoggedIn && (
            <Nav.Link className="navbar-link" href="/authenticate">
              Login/signup
            </Nav.Link>
          )}
          {auth.isLoggedIn && (
            <span onClick={auth.logout}>
              <Nav.Link
                className="navbar-link"
                eventKey={2}
                href="/authenticate"
              >
                Logout
              </Nav.Link>
            </span>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
