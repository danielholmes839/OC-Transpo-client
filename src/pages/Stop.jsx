import React, { useContext } from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from "react-bootstrap";
import { StopTimeList, StopRouteSignLink, Card, Page, ErrorPage, IndentedParagraph, LoadingSpinner } from "components";
import { stopQuery } from "api";
import { StopHistoryContext } from 'context';
import { stopRoutePattern } from "routes";


const StopQuery = () => {
    // Query stop data
    let { id } = useParams();
    let history = useContext(StopHistoryContext);

    let { data, error, loading } = useQuery(stopQuery(id));
    if (loading) { return <LoadingSpinner /> }
    else if (error || data.stop == null) {
        return <ErrorPage title={"Stop Error"}>Stop with id "{id}" could not be found</ErrorPage>
    } else {
        history.add(id);
    }
    // if (data.stop == null) { return <Alert.Danger>Error ID:{id} not found</Alert.Danger> }

    const { stop } = data;
    const { stopRoutes } = stop;

    return (
        <Page title={stop.name}>
            <IndentedParagraph>Stop #{stop.code}</IndentedParagraph>
            <Row>
                {stopRoutes.sort((a, b) => (parseInt(a.number) > parseInt(b.number)) ? 1 : -1).map(stopRoute => {
                    let { id, schedule, liveBusData, route, number, headsign } = stopRoute;
                    return (
                        <Col key={id} lg={4} md={6} sm={12} className="d-flex">
                            <Card>
                                <h6><StopRouteSignLink id={id} route={route} headsign={headsign} /></h6>
                                <StopTimeList stopTimes={schedule.next} number={number} headsign={headsign} />
                                <br />
                                <span className="text-muted">{liveBusData.busCount} Live buses</span>
                                <div className="mt-2">
                                    <Link className="btn btn-sm btn-outline-primary w-100" to={stopRoutePattern(id)}>View</Link>
                                </div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Page>
    )
}
const StopWrapper = () => {
    return <StopQuery />
}

export default StopWrapper;