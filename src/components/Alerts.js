import React from "react";

const Error = ({ children }) => {
    return (
        <div className="alert alert-danger py-3">
            {children}
        </div>
    )
}

const Success = ({ children }) => {
    return (
        <div className="alert alert-success py-3">
            {children}
        </div>
    )
}

export { Error, Success }