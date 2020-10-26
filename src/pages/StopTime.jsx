import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { stopTimeQuery } from "api";
import { stopTimePattern, stopPattern, stopRoutePattern } from "routes";
import { LoadingSpinner, ErrorPage, Page, Section, IndentedParagraph, ButtonLink, StopRouteSign } from "components";

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const serviceDays = (service) => {
    return days.filter((_, i) => service.running[i]).join(", ");
}

const StopTime = () => {
    let { id } = useParams();
    let { data, loading, error } = useQuery(stopTimeQuery(id))

    if (loading) return <LoadingSpinner />
    else if (error) return <ErrorPage title={"Server Error"}>{error.message}</ErrorPage>
    else if (data == null) return <ErrorPage title={"Stop Time Error"}>{error.message}</ErrorPage>

    let { stopTime } = data
    let { stop, route, stopRoute, time, service, trip } = stopTime;
    let show = false;

    return (
        <Page title={`${stopTime.stop.name} - Stop #${stopTime.stop.code}`}>
            <Section title={<span><StopRouteSign id={stopRoute.id} route={route} headsign={stopRoute.headsign} /></span>}>
                <IndentedParagraph>
                    Service on {serviceDays(service.service)} from {service.service.start.string} to {service.service.end.string} at {time.string}.
                </IndentedParagraph>
                <ButtonLink to={stopPattern(stopTime.stop.id)}>View Stop</ButtonLink>
                <ButtonLink to={stopRoutePattern(stopRoute.id)}>View Route</ButtonLink>
            </Section>

            <Section title={"Stops"}>
                {trip.stopTimes.map((tripStopTime, i) => {
                    let tripStop = tripStopTime.stop;
                    if (!show && tripStop.id === stop.id) {
                        show = true;
                    }


                    if (show) {
                        return (
                            <IndentedParagraph>
                                <Link to={stopTimePattern(tripStopTime.id)}>{tripStopTime.time.string}</Link>
                                <span className="font-weight-bold text-primary"></span>  - <Link to={stopPattern(tripStop.id)} className="text-primary-dark">{tripStop.name} </Link>
                            </IndentedParagraph>
                        )
                    } else {
                        return (
                            <IndentedParagraph>
                                <Link className="text-muted" to={stopTimePattern(tripStopTime.id)}>{tripStopTime.time.string}</Link>
                                <span className="font-weight-bold"></span>  - <Link className="text-muted" to={stopPattern(tripStop.id)}>{tripStop.name} </Link>
                            </IndentedParagraph>
                        )
                    }

                    
                })}
            </Section>
        </Page>
    )
}

export default StopTime