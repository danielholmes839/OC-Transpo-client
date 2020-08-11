import React from "react";

const Page = ({ children, title }) => {
    return (
        <div className="py-4">
            {title != null && (
                <div>
                    <h1 className="text-primary-dark font-weight-bolder">{title}</h1>
                </div>
            )}
            {children}
        </div>
    )
};

const IndentedParagraph = ({ children }) => {
    return (
        <p className="border-left border-primary-light pl-3 ml-1 mt-2 text-dark">{children}</p>
    )
}


export { Page, IndentedParagraph };