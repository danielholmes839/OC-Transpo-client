import React from "react";
import { Link } from "react-router-dom"

const Button = ({ children }) => {
    return (
        <div className="btn btn-sm btn-primary font-weight-bold px-4 my-1 mr-2 text-white">
            {children}
        </div>
    )
}

const ButtonAnchor = ({ children, href }) => {
    return (
        <a href={href} className="btn btn-sm btn-primary font-weight-bold px-4 my-1 mr-2 text-white">
            {children}
        </a>
    )
}

const ButtonLink = ({ children, to }) => {
    return (
        <Link to={to}>
            <Button>{children}</Button>
        </Link>
    )
}

export { ButtonAnchor, ButtonLink }