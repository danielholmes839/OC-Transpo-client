import React from "react";
import Alert from "react-bootstrap/Alert"

const Success = ({children}) => {
    return <Alert variant="success" className="my-3">{children}</Alert>
};

const Danger = ({children}) => {
    return <Alert variant="danger" className="my-3">{children}</Alert>
};

export default {
    Success, Danger
};