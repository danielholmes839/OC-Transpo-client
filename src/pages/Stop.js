import React from "react";
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Error, Success } from "../components/Alerts";
import { Card, RouteSign } from "../components";
import { Link } from "react-router-dom"
import { StopTimeList } from "../components";

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
    if (loading) { return <Success>Loading</Success> }
    if (data.stop == null) { return <Error>Error ID:{id} not found </Error> }
    if (error) { return <Error>{error.message}</Error> }

    const { stop } = data;
    const { stopRoutes } = stop;

    return (
        <Card title={stop.name}>
            <div className="row mt-3">
                {stopRoutes.map(stopRoute => {
                    return (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h6><Link to={"/stoproute/" + stopRoute.id}><RouteSign route={stopRoute.route} /> {stopRoute.headsign}</Link></h6>
                            <p className="mb-1">
                                <StopTimeList stopTimes={stopRoute.schedule.next} number={stopRoute.number} headsign={stopRoute.headsign} />
                            </p>
                            <span className="text-muted">{stopRoute.liveBusData.busCount} Live buses</span>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default Stop;