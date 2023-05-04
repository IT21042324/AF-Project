import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { UseUserContext } from "../context/useUserContext";

export function NavBar() {
  const { setSelectedUserRole } = UseUserContext();

  const [isSellerPage, setIsSellerPage] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "10vh" }}
    >
      <Container>
        <LinkContainer to="/" onClick={(e) => setIsSellerPage(false)}>
          <Navbar.Brand>Heavenly</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer
              to="/addEvent"
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

            <LinkContainer
              to="/editEvent"
              onClick={(e) => setIsSellerPage(false)}
            >
              <Nav.Link>Temporary admin events edit&delete</Nav.Link>
            </LinkContainer>

            <LinkContainer
              to="/displayEvents"
              onClick={(e) => setIsSellerPage(false)}
            >
              <Nav.Link>Temporary user view events page</Nav.Link>
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
            <LinkContainer to="/login">
              <Nav.Link
                eventKey={2}
                onClick={(e) => {
                  if (isSellerPage) setSelectedUserRole("Entrepreneur");
                  else if (!isSellerPage) setSelectedUserRole("User");
                }}
              >
                {isSellerPage ? "Become an Entrepreneur" : "Login"}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
