import React from "react";
import { StopRouteSign } from "./Signs";


export const Bus = ({ bus, route }) => {
    /* One bus */
    return (
        <div>
            {bus.gps !== null && <span><StopRouteSign route={route} headsign={bus.headsign} /> - {bus.arrival.string} ({bus.gps.distance})</span>}
            {bus.gps === null && <span><StopRouteSign route={route} headsign={bus.headsign} /> - {bus.arrival.string}</span>}
            <br />
            {!bus.onTime && <span className="text-muted">Late. Last updated {bus.age} minutes ago</span>}
            {bus.onTime && <span className="text-muted">This bus is on schedule</span>}
        </div>
    )
};

export const BusList = ({ buses, route }) => {
    /* List of buses */
    return (
        <ul className="list-unstyled">
            {buses.map((bus, index) => <li key={index} className="mb-3"><Bus bus={bus} route={route} /></li>)}
        </ul>
    )
};

export const LiveBusMap = ({ map }) => {
    return (
        <div className="overflow-hidden position-relative">
            <img src={map} alt="google maps api - live bus data" />
        </div>
    )
};
