import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

export function NavBar(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "4vh" }}
    >
      <Container>
        <LinkContainer to="/placeRoutes/displayPlaces">
          <Navbar.Brand>Heavenly</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/cultural/displayEvents">
              <Nav.Link>Cultural Events</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/entrepreneurship">
              <Nav.Link>Entrepreneurship</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/Accommodations">
              <Nav.Link>Accomodations</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cultural/BookEvent">
              <Nav.Link>Temporary Book event</Nav.Link>
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
              <Nav.Link eventKey={2}>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
