import React from "react";
import { StopRouteSign } from "./Signs";


export const Bus = ({ bus, route, headsign }) => {
    /* One bus */
    let message;
    if (bus.onTime) {
        message = "This bus is on schedule";
    } else if (!bus.onTime && bus.age === 0) {
        message = "Updated just now";
    } else if (!bus.onTime && bus.age === 1) {
        message = "Updated 1 minute ago";
    } else {
        message = `Updated ${bus.age} minutes ago`;
    }


    return (
        <div>
            {bus.hasPosition && <span><StopRouteSign route={route} headsign={headsign} /> - {bus.arrival.string} ({bus.distance})</span>}
            {!bus.hasPosition && <span><StopRouteSign route={route} headsign={headsign} /> - {bus.arrival.string}</span>}
            <br />
            <span className="text-muted">{message}</span>
        </div>
    )
};

export const BusList = ({ buses, route, headsign }) => {
    /* List of buses */
    return (
        <ul className="list-unstyled">
            {buses.map((bus, index) => <li key={index} className="mb-3"><Bus bus={bus} headsign={headsign} route={route} /></li>)}
        </ul>
    )
};

export const LiveBusMap = ({ map }) => {
    return (
        <div>
            <img className="img-fluid" src={map} alt="Thank you for using this site. Maps are currently disabled for security reasons" />
        </div>
    )
};
