import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

export function NavBar() {
  const [isSellerPage, setIsSellerPage] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/" onClick={(e) => setIsSellerPage(false)}>
          <Navbar.Brand>Heavenly</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer
              to="/culturalEvents"
              onClick={(e) => setIsSellerPage(false)}
            >
              <Nav.Link>Cultural Events</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/entrepreneurship"
              onClick={(e) => setIsSellerPage(true)}
            >
              <Nav.Link>Entrepreneurship</Nav.Link>
            </LinkContainer>

            <LinkContainer
              to="/accomodation"
              onClick={(e) => setIsSellerPage(false)}
            >
              <Nav.Link>Accomodations</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Drop-Down" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isSellerPage && (
              <LinkContainer to="/login">
                <Nav.Link eventKey={2} onClick={(e) => setIsSellerPage(false)}>
                  Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
