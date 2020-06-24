import React from "react";
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Error, Success } from "../components/Alerts";
import { Card } from "../components";
import { StopRouteSign, StopTimeList, BusList, LiveBusMap } from "../components";

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
    if (loading) { return <Success>Loading</Success> }
    if (data.stopRoute == null) { return <Error>Error ID:{id} not found </Error> }
    if (error) { return <Error>{error.message}</Error> }
    

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
                <Error>No live data is available</Error>
            )}

            {data.stopRoute.liveBusData.busCount > 0 && (
                <Card title="Live Bus Data">
                    <BusList buses={liveBusData.buses} route={route} />
                    {stopRoute.map !== null && (<LiveBusMap map={stopRoute.map}/>)}
                    {stopRoute.map === null && (<Error>Live map could not be created. No GPS data is available</Error>)}
                </Card>
            )}
        </div>
    )
}

export default StopRoute;