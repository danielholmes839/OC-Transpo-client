import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { StopPreview } from "../components";
import { Alert } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import { useDebounce } from 'use-lodash-debounce'


const SearchResults = ({ search, setLoading }) => {
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
    if (loading) { return null; }
    setLoading(false);

    if (error) { 
        return <Alert variant="danger">{error.message}</Alert> 
    }

    if (data.stops.length === 0) {
        return <Alert variant="danger">No results found for "{search}"</Alert> 
    } 

    return (
        <div>
            {data.stops.map(stop => <StopPreview key={stop.id} stop={stop} />)}
        </div>
    )

}


const Search = () => {
    let [search, setSearch] = useState("");
    let [loading, setLoading] = useState(false);
    let debouncedSearch = useDebounce(search, 700);

    return (
        <div>
            <h1>Search</h1>
            <p>Find a stop</p>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search: Hurdman, Tunneys..."
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    setLoading(true);
                }} />

            {debouncedSearch.length > 0 && <SearchResults search={debouncedSearch} setLoading={setLoading} />}

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
        </div>
    )
}

export default Search;