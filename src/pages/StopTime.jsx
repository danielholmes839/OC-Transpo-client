import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { stopTimeQuery } from "api";
import { stopTimePattern, stopPattern, stopRoutePattern } from "routes";
import { LoadingSpinner, ErrorPage, Page, StopRouteSignLink, Section, IndentedParagraph, ButtonLink } from "components";

let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
let days_nice = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const serviceDays = (service) => {
    return days_nice.filter((day, i) => service[days[i]]).join(", ");
}

const StopTime = () => {
    let { id } = useParams();
    let { data, loading, error } = useQuery(stopTimeQuery(id))

    if (loading) return <LoadingSpinner />
    else if (error) return <ErrorPage title={"Server Error"}>{error.message}</ErrorPage>
    else if (data == null) return <ErrorPage title={"Stop Time Error"}>{error.message}</ErrorPage>

    let { stop, route, stopRoute, time, service, trip } = data.stopTime;

    return (
        <Page title={`${stop.name} - Stop #${stop.code}`}>
            <Section title={<span><StopRouteSignLink id={stopRoute.id} route={route} headsign={stopRoute.headsign} /> - {time.string}</span>}>
                <IndentedParagraph>
                    Service on {serviceDays(service.service)} from {service.service.start.string} to {service.service.end.string}.
                </IndentedParagraph>
                <IndentedParagraph>
                    {days.filter(day => service[day]).map((day, i) => days_nice[i]).join(', ')}
                </IndentedParagraph>
                <ButtonLink to={stopPattern(stop.id)}>View Stop</ButtonLink>
                <ButtonLink to={stopRoutePattern(stopRoute.id)}>View Route</ButtonLink>
            </Section>

            <Section title={"Stops"}>
                {trip.stopTimes.map(stopTime => {
                    let { stop } = stopTime;
                    return (
                        <IndentedParagraph>
                            <Link to={stopTimePattern(stopTime.id)}>{stopTime.time.string}</Link>
                            <span className="font-weight-bold text-primary"></span>  - <Link to={stopPattern(stop.id)} className="text-primary-dark">{stop.name}</Link>
                        </IndentedParagraph>
                    )
                })}
            </Section>
        </Page>
    )
}

export default StopTime