import React from "react";
import { Nav } from "react-bootstrap";

export function SideNavigation() {
  return (
    <div className="d-flex">
      <Nav className="flex-column bg-light sidebar align-self-center">
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="flex-grow-1 p-3">{/* Add your page content here */}</div>
    </div>
  );
}
