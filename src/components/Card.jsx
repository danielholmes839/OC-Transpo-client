import React from "react";
import BootstrapCard from "react-bootstrap/Card";

export const Card = ({ title, children }) => {
    /* Card */
    return (
        <div className="p-4 my-3 bg-white card-shadow flex-fill">
            {title && (
                <div>
                    <BootstrapCard.Title className="mb-2">{title}</BootstrapCard.Title>
                    <hr className="my-0 mb-2" />
                </div>
            )}
            <div>
                {children}
            </div>
        </div>
    )
}
