import React from 'react';
import { Link } from 'react-router-dom';
import { stopRoutePattern } from 'routes'


export const RouteSign = ({ route }) => {
    /* Route Sign/Badge with colour  */
    const { backgroundColour, textColour, number } = route;
    return (
        <span style={{
            backgroundColor: backgroundColour,
            color: textColour
        }} className="px-2 rounded-pill font-weight-bold">{number}</span>
    );
};

export const StopRouteSign = ({ route, headsign }) => {
    return (
        <span><RouteSign route={route} /> {headsign}</span>
    );
};

export const StopRouteSignLink = ({ id, route, headsign }) => {
    return (
        <Link to={stopRoutePattern(id)}><RouteSign route={route} /> {headsign}</Link>
    );
};
