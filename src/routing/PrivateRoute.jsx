import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuth();
    
    return (
        <Route
            {...rest}
            render={
                props => {
                    return (authData !== null) ? (<Component {...props} />) : (<Redirect to="/" />)
                }
            }
        />
    );
}

export default PrivateRoute;