import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UseUserContext } from "../hooks/useUserContext";
import { useState, useEffect } from "react";

export function NavBar(props) {
  const { logoutUser, dispatch, getUser } = UseUserContext();

  const user = getUser();

  const logoutFunction = () => {
    logoutUser();
  };

  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    setProfilePic(user?.image);
  }, [user?.image]);

  useEffect(() => {
    async function setProfilePicture() {
      if (user?.image) setProfilePic(user.image);
    }
    setProfilePicture();
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
        <LinkContainer to="/">
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
          </Nav>
        </Navbar.Collapse>

        <div className="navbar-icons">
          <div>
            {user ? (
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "10px" }}>
                  <h6 style={{ color: "white" }}>{user.userName}</h6>
                  <Link to="/" onClick={logoutFunction}>
                    <h6 style={{ float: "right", color: "red" }}>Logout</h6>
                  </Link>
                </div>
                &nbsp;&nbsp;&nbsp;
                {/* Displaying the user profile picture*/}
                {profilePic && (
                  <img
                    src={profilePic}
                    alt={user.userName}
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "40px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>
            ) : (
              // Displaying a link to the login page if the user is not logged in
              <Link
                to="/login"
                onClick={(e) => {
                  dispatch({ type: "SetUserRole", userRole: "Buyer" });
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
