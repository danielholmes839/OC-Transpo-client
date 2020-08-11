import React from "react";

const Section = ({ title, children }) => {
    return (
        <div className="mb-5">
            {title != null && <h4 className="font-weight-bold text-primary-dark">{title}</h4>}
            {children}
        </div>
    )
}

export default Section