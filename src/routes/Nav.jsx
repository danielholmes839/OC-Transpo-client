import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { homePattern, historyPattern, searchPattern } from "./patterns"

const AppNav = () => {
    return (
        <Navbar className="shadow-sm" bg="light" expand="lg">
            <Container className="py-3">
                <Navbar.Brand>OC Transpo GraphQL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="text-primary" as={Link} to={homePattern}>Home</Nav.Link>
                        <Nav.Link className="text-primary" as={Link} to={historyPattern}>History</Nav.Link>
                        <Nav.Link className="text-primary" as={Link} to={searchPattern}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default AppNav