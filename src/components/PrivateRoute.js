import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authTokens } = useAuth();

    return (
        <Route
            {...rest}
            render={
                props => {
                    return (authTokens != null && authTokens.token != null) ? (<Component {...props} />) : (<Redirect to="/login" />)
                }
            }
        />
    );
}

export default PrivateRoute;