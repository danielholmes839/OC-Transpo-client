import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Page, IndentedParagraph, Section, ErrorPage, ErrorMessage, StopTimeList, BusList, LiveBusMap, LoadingSpinner } from "components";
import { stopRouteQuery, stopRouteScheduleQuery } from "api"

const FullSchedule = ({ id }) => {
    let { data, error, loading } = useQuery(stopRouteScheduleQuery(id));
    if (data) {
        return (
            <Section title={"Full Schedule"}>
                <IndentedParagraph style={{wordBreak: 'break-all' }}><StopTimeList stopTimes={data.stopRoute.schedule.all}/></IndentedParagraph>
            </Section> 
        )
    } else {
        return null
    }
}

const FullScheduleWrapper = ({ id }) => {
    let [show, setShow] = useState(false);

    return (
        <div>
            {show ? (
                <FullSchedule id={id}/>
            ) : (
                <button className="btn btn-primary font-weight-bold" onClick={() => setShow(true)}>Full Schedule</button>
            ) }
        </div>
    )
}
const StopRoute = () => {
    let { id } = useParams();
    let { data, error, loading } = useQuery(stopRouteQuery(id));

    // Apollo loading or error
    if (loading) { return <LoadingSpinner/> }
    else if (error || data.stopRoute == null) { return <ErrorPage title={"Route Error"}>Route with id "{id}" could not be found</ErrorPage> }

    const { stopRoute } = data;
    const { stop, route, liveBusData } = stopRoute;

    return (
        <Page title={`${stopRoute.number} ${stopRoute.headsign}`}>
            {/* <StopRouteSign route={route} headsign={stopRoute.headsign} /> */}
            <Section>
            <IndentedParagraph>Stop #{stop.code} ({stop.name})</IndentedParagraph>
            </Section>
            <Section title={"Schedule"}>
                <IndentedParagraph>
                    <StopTimeList stopTimes={stopRoute.schedule.next} number={stopRoute.number} headsign={stopRoute.headsign} />
                </IndentedParagraph>
                <FullScheduleWrapper id={id}/>
            </Section>

            {data.stopRoute.liveBusData.busCount === 0 && (
                <Section title="Live Bus Data">
                    <ErrorMessage>There is no live bus data available</ErrorMessage>
                </Section>
            )}

            {data.stopRoute.liveBusData.busCount > 0 && (
                <Section title="Live Bus Data">
                    <IndentedParagraph>
                        <BusList buses={liveBusData.buses} route={route} />
                    </IndentedParagraph>
                    {stopRoute.map !== null && (<LiveBusMap map={stopRoute.map} />)}
                    {stopRoute.map === null && (<ErrorMessage>Live map could not be created. No GPS data is available</ErrorMessage>)}
                </Section>
            )}
        </Page>
    )
}

export default StopRoute;