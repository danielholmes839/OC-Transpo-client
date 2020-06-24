import React, { useState } from 'react';
import { Link } from "react-router-dom";


export const Card = ({ title, children }) => {
    return (
        <div className="card p-3 mb-3">
            <h5 className="card-title mb-2">{title}</h5>
            <hr className="my-0 mb-2"/>
            {children}
        </div>
    )
}

export const RouteSign = ({ route }) => {
    const { backgroundColour, textColour, number } = route;
    return (
        <span style={{
            backgroundColor: backgroundColour,
            color: textColour
        }} className="px-2 rounded-pill font-weight-bold">{number}</span>
    );
} 

export const StopRouteSign = ({ route, headsign }) => {
    return (
        <span><RouteSign route={route}/> {headsign}</span>
    );
}

export const StopRouteSignLink = ({ id, route, headsign }) => {
    return (
        <Link to={"/stoproute/"+id}><RouteSign route={route}/> {headsign}</Link>
    );
}

export const StopTimeList = ({ stopTimes, number, headsign }) => {
    /* List of stop times */
    if (stopTimes.length > 0) {
        return (
            <span>
                Next stop times: {stopTimes.map(stopTime => <Link key={stopTime.id} className="mr-2" to={"/stoptime/"+stopTime.id}>{stopTime.time.string}</Link>)}
            </span>
        );
    }
    return <span>There no more trips today for {number} {headsign}</span>
}


export const Bus = ({ bus, route }) => {
    /* One bus */
    return (
        <div>
            {bus.gps !== null && <span><StopRouteSign route={route} headsign={bus.headsign}/> - {bus.arrival.string} ({bus.gps.distance})</span>}
            {bus.gps === null && <span><StopRouteSign route={route} headsign={bus.headsign}/> - {bus.arrival.string}</span>}
            <br />
            {!bus.onTime && <span className="text-muted">Late. Last updated {bus.age} minutes ago</span>}
            {bus.onTime && <span className="text-muted">This bus is on schedule</span>}
        </div>
    )
}

export const BusList = ({ buses, route }) => {
    /* List of buses */
    return (
        <ul className="list-unstyled">
            {buses.map((bus, index) => <li key={index} className="mb-3"><Bus bus={bus} route={route}/></li>)}
        </ul>
    )
}

export const LiveBusMap = ({ map }) => {
    return (
        <div className="overflow-hidden position-relative">
            <img src={map} />
        </div>
    )
}

export const StopRouteList = ({ stopRoutes }) => {
    /* List of route numbers and headsigns from the list of stoproutes  */
    return (
        <p>
            {stopRoutes.map(stopRoute => {
                const {id, headsign, route} = stopRoute;
                return (
                    <span key={id} className="mr-3 d-inline-block">
                        <StopRouteSignLink id={id} key={id} headsign={headsign} route={route}/>
                    </span>
                )
            })}
        </p>
    )
}

export const StopPreview = ({ stop }) => {
    const title = `${stop.name} - ${stop.code}`;

    return (
        <Card title={title}>
            <StopRouteList stopRoutes={stop.stopRoutes} />
            <div className="mt-2">
                <Link className="btn btn-sm btn-outline-primary px-5" to={"stop/" + stop.id}>View</Link>
            </div>
        </Card>
    )
}

export const FavouriteStopPreview = ({ favouriteStop }) => {
    const title = `${favouriteStop.stop.name} - ${favouriteStop.stop.code}`;
    const [deleted, setDeleted] = useState(false);

    if (!deleted) {
        return (
            <Card title={title}>
                <StopRouteList stopRoutes={favouriteStop.stopRoutes}/>
                <div className="mt-2">
                    <Link className="btn btn-sm btn-outline-primary px-5 mr-3" to={"favouritestop/" + favouriteStop.id}>View</Link>
                    <button className="btn btn-sm btn-outline-danger px-5" onClick={() => setDeleted(true)} to={"favouritestop/" + favouriteStop.id}>Delete</button>
                </div>
            </Card>
        )
    }
    return null;
}