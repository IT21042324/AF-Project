import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { UseUserContext } from "../hooks/useUserContext";
import { useEffect } from "react";

export function NavBar(props) {
  const { setSelectedUserRole, selectedUserRole } = UseUserContext();

  useEffect(() => {
    setSelectedUserRole("Entrepreneur");
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "4vh" }}
    >
      <Container>
        <LinkContainer
          to="/placeRoutes/displayPlaces"
          onClick={(e) => setSelectedUserRole("Entrepreneur")}
        >
          <Navbar.Brand>Heavenly</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer
              to="/addEvent"
              onClick={(e) => {
                setSelectedUserRole("User");
              }}
            >
              <Nav.Link>Cultural Events</Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/entrepreneurship"
              onClick={(e) => {
                setSelectedUserRole("Entrepreneur");
              }}
            >
              <Nav.Link>Entrepreneurship</Nav.Link>
            </LinkContainer>

            <LinkContainer
              onClick={(e) => {
                setSelectedUserRole("User");
              }}
              to="/Accommodations"
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
            <LinkContainer
              to="/login"
              onClick={(e) => {
                {
                  selectedUserRole === "User"
                    ? setSelectedUserRole("User")
                    : setSelectedUserRole("Entrepreneur");
                }
              }}
            >
              <Nav.Link eventKey={2}>
                {selectedUserRole === "User"
                  ? "Login"
                  : "Become an Entrepreneur"}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
