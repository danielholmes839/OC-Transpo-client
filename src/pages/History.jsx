import React, { useContext, useState } from "react"
import { useQuery } from "@apollo/react-hooks";
import { StopHistoryContext } from "context";
import { stopHistoryQuery } from "api";
import { StopPreview, Page, IndentedParagraph, ButtonLink, LoadingSpinner } from "components";


const HistoryEmpty = () => {
    return (
        <div>
            <IndentedParagraph>
                There's nothing here... You haven't viewed any stops yet
            </IndentedParagraph>
            <ButtonLink to={"/search"}>Search</ButtonLink>
        </div>
    )
}

const HistoryExists = ({ stops, setStops }) => {
    const clearHistory = () => {
        history.clear();
        setStops([]);
    }

    let history = useContext(StopHistoryContext);
    let { data, error, loading } = useQuery(stopHistoryQuery(stops));
    if (loading) { return <LoadingSpinner /> }
    else if (error) {
        console.log(error);
        return "Error"
    }

    return (
        <div>
            <IndentedParagraph>Previously viewed stops</IndentedParagraph>
            <div>
                <button onClick={clearHistory} className="btn btn-danger btn-sm px-5 font-weight-bold">Clear</button>
                {data.stops.filter(stop => stop != null).map(stop => <StopPreview key={stop.id} stop={stop} />)}
            </div>
        </div>
    )
}

const History = () => {
    let history = useContext(StopHistoryContext);
    let [items, setItems] = useState(history.items);

    return (
        <Page title={"History"}>
            {items.length === 0 && (<HistoryEmpty />)}
            {items.length > 0 && (<HistoryExists stops={items} setStops={setItems} />)}
        </Page>
    )

}

export default History;