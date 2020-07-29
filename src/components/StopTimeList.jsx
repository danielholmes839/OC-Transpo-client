import React from "react";
import { Link } from "react-router-dom";

const StopTimeList = ({ stopTimes, number, headsign }) => {
    /* List of stop times */
    if (stopTimes.length > 0) {
        return (
            <span>
                Next stop times: {stopTimes.map(stopTime => <Link key={stopTime.id} className="mr-2" to={"/stoptime/" + stopTime.id}>{stopTime.time.string}</Link>)}
            </span>
        );
    }
    else {
        return (
            <span>There no more stops today for the {number} {headsign}</span>
        );
    }
};

export default StopTimeList;
