import React from "react";

const Page = ({ title, children }) => {
    return (
        <div>
            <h1>{title}</h1>
            <hr />
            {children}
        </div>
    )
};

export default Page;