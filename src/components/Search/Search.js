import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { StopPreview } from "../../components";
import { Error, Success } from "../Alerts";

const SearchResults = ({ search }) => {
    let { data, loading, error } = useQuery(gql`
        query {
            stops: Stop_search(name: "${search}", limit: 10) {
                id
                name
                code

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
    `)
    if (loading) { return <Success>Loading...</Success> }
    else if (error) { return <Error>Error</Error> }

    return (
        <div>
            { data.stops.map(stop => <StopPreview key={stop.id} stop={stop} />)}
        </div>
    )
    
}

const Search = () => {
    let [search, setSearch] = useState("");

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Stop Name"
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                }} />
            
            {search.length > 0 && <SearchResults search={search} />}
        </div>
    )
}

export default Search;