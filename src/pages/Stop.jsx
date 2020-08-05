import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from "react-bootstrap";
import { StopTimeList, StopRouteSignLink, Card, Alert } from "components";
import { stopQuery } from "api";
import { HistoryContext } from 'context';


const Stop = () => {
    const { id } = useParams();
    const history = useContext(HistoryContext);
    console.log(history);
    history.add(id);
    console.log(history.items);
    const query = stopQuery(id);
    let { data, error, loading } = useQuery(query);
    if (loading) { return <Alert.Success>Loading</Alert.Success> }
    if (error) { return <Alert.Danger>{error.message}</Alert.Danger> }
    if (data.stop == null) { return <Alert.Danger>Error ID:{id} not found</Alert.Danger> }
    
    
    const { stop } = data;
    const { stopRoutes } = stop;

    return (
        <div>
            <div className="mt-3">
                <h1 className="font-weight-bold">{stop.name}</h1>
                <p className="text-muted">Stop #{stop.code}</p>
            </div>
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
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Stop;