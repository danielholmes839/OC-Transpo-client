import React from "react";
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { StopTimeList, Card, StopRouteSignLink } from "../components";
import { Col, Row, Alert } from "react-bootstrap";

const Stop = () => {
    const { id } = useParams();
    const query = gql`
        query {
            stop: Stop_get(stop: "${id}") {
                id
                name
                code

                stopRoutes {
                    id
                    headsign
                    number

                    route {
                        id
                        number
                        textColour
                        backgroundColour
                    }

                    liveBusData {
                        busCount
                    }

                    schedule {
                        next(number: 3) {
                            id
                            time {
                                string
                                remaining
                            }
                        }
                    }
                }
            }
        }
    `;

    let { data, error, loading } = useQuery(query);
    if (loading) { return <Alert variant="success">Loading</Alert> }
    if (error) { return <Alert variant="danger">{error.message}</Alert> }
    if (data.stop == null) { return <Alert variant="danger">Error ID:{id} not found</Alert> }

    const { stop } = data;
    const { stopRoutes } = stop;

    return (
        <Card title={stop.name}>
            <Row className="mt-3">
                {stopRoutes.map(stopRoute => {
                    let { id, schedule, liveBusData, route, number, headsign } = stopRoute;
                    return (
                        <Col key={id} lg={4} md={6} sm={12} className="mb-4">
                            <h6><StopRouteSignLink id={id} route={route} headsign={headsign}/></h6>
                            <StopTimeList stopTimes={schedule.next} number={number} headsign={headsign} />
                            <br />
                            <span className="text-muted">{liveBusData.busCount} Live buses</span>
                        </Col>
                    )
                })}
            </Row>
        </Card>
    )
}

export default Stop;