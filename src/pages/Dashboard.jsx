import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { FavouriteStopPreview } from "../components";
import { Alert } from "react-bootstrap";


let query = gql`
    query {
        user: User_get {
            id
            email
            favouriteStops {
                id
                stop {
                    id
                    name
                    code
                }
                stopRoutes {
                    id
                    headsign
                    number
                    
                    route {
                        textColour
                        backgroundColour
                        number
                    }
                }
            }    
        }
    }
`

const User = () => {
    const { loading, error, data } = useQuery(query);

    return (
        <div>
            {loading && (
                <Alert variant="success">Loading</Alert>
            )}

            {(!loading && data) && (
                <div>
                    <h1>{data.user.email} (Favourite Stops)</h1>
                    <p>ID:{data.user.id}</p>
                    {data.user.favouriteStops.length > 0 && (
                        <div>
                            {data.user.favouriteStops.map(favouriteStop => (
                                <div key={favouriteStop.id} className="mb-3">
                                    <FavouriteStopPreview favouriteStop={favouriteStop} />
                                </div>
                            ))}
                        </div>

                    )}
                </div>
            )}

            {(!loading && error != null) && (
                <p> {error.message} </p>
            )}
        </div>


    )
}

export default User;