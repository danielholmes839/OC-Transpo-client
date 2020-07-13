import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


const LogoutButton = () => {
    const { authData, setAuthData } = useAuth();
    const setLoggedIn = useState(authData !== null)[1];
    
    const logout = () => {
        setLoggedIn(false);
        setAuthData(null)
    }

    return (
        <button onClick={logout} className="btn btn-primary btn-block">Logout</button>
    )
}

const AppNav = () => {
    const { authData } = useAuth();
    return (
        <Navbar bg="light" expand="lg">
            <Container className="py-3">
                <Navbar.Brand>OC Transpo GraphQL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Search</Nav.Link>

                        {authData !== null && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/dashboard" className="text-decoration-none text-gray">Favourites</Nav.Link>
                                <DropdownButton id="dropdown-item-button" title="Account">
                                    <Dropdown.Header>{authData.user}</Dropdown.Header>
                                    <NavDropdown.Divider />
                                    <Dropdown.Item className="m-0 p-0 px-2"><LogoutButton/></Dropdown.Item>
                                </DropdownButton>
                            </React.Fragment>
                        )}

                        {authData === null && (
                            <React.Fragment>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </React.Fragment>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default AppNav