import React from "react";
import { NavLink } from "react-router-dom";

// Bootstrap
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { homePattern, historyPattern, searchPattern } from "./patterns"

const AppNav = () => {
    let activeClassName = "border-left border-primary font-weight-bold text-primary"
    return (
        <Navbar className="shadow-sm" expand="lg">
            <Container className="py-3">
                <Navbar.Brand className="font-weight-bolder text-primary">Stop Checker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="py-0 pl-2 ml-2 my-1" as={NavLink} activeClassName={activeClassName} to={homePattern}>Home</Nav.Link>
                        <Nav.Link className="py-0 pl-2 ml-2 my-1" as={NavLink} activeClassName={activeClassName} to={historyPattern}>History</Nav.Link>
                        <Nav.Link className="py-0 pl-2 ml-2 my-1" as={NavLink} activeClassName={activeClassName} to={searchPattern}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default AppNav