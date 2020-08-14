import React from "react";
import { Page, ButtonLink } from "components"

const ErrorMessage = ({children}) => {
    return (
        <p className="border-left border-danger text-danger font-weight-bold pl-3 ml-1 mt-2">{children}</p>
    )
}

const ErrorPage = ({ title, children }) => {
    let _title = ( title == null) ? 'Error' : title;

    return (
        <Page title={_title}>
            <ErrorMessage>{children}</ErrorMessage>
            <ButtonLink to={"/home"}>Home</ButtonLink>
            <ButtonLink to={"/search"}>Search</ButtonLink> 
        </Page>
        
    )
}

export { ErrorPage, ErrorMessage };