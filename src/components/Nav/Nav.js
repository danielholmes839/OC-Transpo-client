import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light py-4 mb-4">
            <div className="container">
            <Link className="navbar-brand" to="/">OC Transpo GraphQL</Link>
            <div className="navbar" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">Favourites</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                </ul>
            </div>
            </div>
        </nav>

    )
}

export default Nav