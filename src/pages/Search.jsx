import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-lodash-debounce";
import { searchQuery } from "api";
import { StopPreview, Page, IndentedParagraph, LoadingSpinner, ErrorMessage } from "components";


const SearchQuery = ({ search, setLoading }) => {
    ReactGA.event({
        category: 'Request',
        action: 'search',
    });

    let { data, loading, error } = useQuery(searchQuery(search)) //useQuery(searchQuery(search))

    useEffect(() => setLoading(false))
    if (loading) { return null; }
    else if (error) {
        ReactGA.event({
            category: 'Error',
            action: 'search',
            label: search
        });
    }
    else if (error || data.stops.length === 0) {
        return (<ErrorMessage>No stops could found for: {search}</ErrorMessage>)
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
        <Page title={"Search"}>
            <IndentedParagraph>Find your stop! Search by name or 4 digit stop code</IndentedParagraph>
            <input
                type="text"
                className="form-control mb-1"
                placeholder="Search: Hurdman, Tunneys, 3021, 3023..."
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    setLoading(true);
                }}
            />
            {debouncedSearch.length > 0 && <SearchQuery search={debouncedSearch} setLoading={setLoading} />}

            {loading && (<LoadingSpinner />)}
        </Page>
    )
}

export default Search