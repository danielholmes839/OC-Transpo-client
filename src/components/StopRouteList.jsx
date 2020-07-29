import React from "react";
import { StopRouteSignLink } from "./Signs";


const StopRouteList = ({ stopRoutes }) => {
    /* List of route numbers and headsigns from the list of stoproutes  */
    return (
        <p>
            {stopRoutes.sort((a, b) => (parseInt(a.number) > parseInt(b.number)) ? 1 : -1).map(stopRoute => {
                const { id, headsign, route } = stopRoute;
                return (
                    <span key={id} className="mr-3 d-inline-block">
                        <StopRouteSignLink id={id} key={id} headsign={headsign} route={route} />
                    </span>
                )
            })}
        </p>
    );
};

export default StopRouteList;