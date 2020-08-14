import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Page, IndentedParagraph, Section, ErrorPage, ErrorMessage, StopTimeList, BusList, LiveBusMap, LoadingSpinner } from "components";
import { stopRouteQuery } from "api"

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