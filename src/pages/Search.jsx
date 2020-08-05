import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-lodash-debounce";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner"
import { searchQuery } from "api";
import { StopPreview } from "components";


const SearchResults = ({ search, setLoading }) => {
    let { data, loading, error } = useQuery(searchQuery(search))
    if (loading) { return null; }
    setLoading(false);

    if (error) {
        return <Alert variant="danger" className="mt-3">{error.message}</Alert>
    }

    if (data.stops.length === 0) {
        return <Alert variant="danger" className="mt-3">No results found for "{search}"</Alert>
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
        <React.Fragment>
            <div className="mt-3">
                <h1 className="font-weight-bold">Search</h1>
                <p className="text-muted">Find your stop by name or 4 digit stop code</p>
                <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Search: Hurdman, Tunneys, 3023..."
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setLoading(true);
                    }}
                />
            </div>
            {debouncedSearch.length > 0 && <SearchResults search={debouncedSearch} setLoading={setLoading} />}

            {loading && (
                <div className="text-center mt-4">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
        </React.Fragment>
    )
}

export default Search