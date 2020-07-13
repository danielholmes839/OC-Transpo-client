import React from "react";
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { StopRouteSign, StopTimeList, BusList, LiveBusMap } from "../components";
import { Card } from '../components';
import { Alert } from "react-bootstrap";

const StopRoute = () => {
    const { id } = useParams();
    const query = gql`
        query {
            stopRoute: StopRoute_get(stopRoute: "${id}") {
                id
                headsign
                number
                
                liveBusData {
                    busCount
                    buses {
                        headsign
                        number
                        age
                        onTime
                        arrival {
                            string
                            remaining
                        }
                        gps {
                            distance
                        }
                    }
                }

                map(zoom: 13, width: 800, height: 400)
                
                schedule {
                    next(number: 5) {
                        id
                        time {
                            string
                            remaining
                        }
                    }
                }
                
                route {
                    id
                    number
                    backgroundColour
                    textColour
                }
                
                stop {
                    id
                    name
                    code
                }
            }
        }
    `;

    let { data, error, loading } = useQuery(query);
    
    // Apollo loading or error
    if (loading) { return <Alert variant="success">Loading</Alert> }
    if (error) { return <Alert variant="danger">{error.message}</Alert> } 
    if (data.stopRoute == null) { return <Alert variant="danger">Error ID:{id} not found</Alert> }

    const { stopRoute } = data;
    const { stop, route, liveBusData } = stopRoute;

    return (
        <div>
            <div className="mb-4">
                <h1>{stop.name} {stop.code}</h1>
                <h4><StopRouteSign route={route} headsign={stopRoute.headsign}/></h4>
            </div>

            <Card title="Schedule">
                <StopTimeList stopTimes={stopRoute.schedule.next} number={stopRoute.number} headsign={stopRoute.headsign} />
            </Card>

            {data.stopRoute.liveBusData.busCount === 0 && (
                <Alert variant="danger">No live data is available</Alert>
            )}

            {data.stopRoute.liveBusData.busCount > 0 && (
                <Card title="LiveBusData">
                    <BusList buses={liveBusData.buses} route={route} />
                    {stopRoute.map !== null && (<LiveBusMap map={stopRoute.map}/>)}
                    {stopRoute.map === null && (<Alert variant="danger">Live map could not be created. No GPS data is available</Alert>)}
                </Card>
            )}
        </div>
    )
}

export default StopRoute;