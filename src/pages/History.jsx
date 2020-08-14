import React, { useContext, useState } from "react"
import { useQuery } from "@apollo/react-hooks";
import { HistoryContext } from "context";
import { stopHistoryQuery } from "api";
import { StopPreview, Page, IndentedParagraph, ButtonLink, LoadingSpinner } from "components";


const HistoryEmpty = () => {
    return (
        <Page title={"History"}>
            <IndentedParagraph>
                There's nothing here... You haven't viewed any stops yet
            </IndentedParagraph>
            <ButtonLink to={"/search"}>Search</ButtonLink>
        </Page>
    )
}

const HistoryExists = ({ stops, setStops }) => {
    const clearHistory = () => {
        history.clear()
        setStops([])
    }

    let history = useContext(HistoryContext);
    let { data, error, loading } = useQuery(stopHistoryQuery(stops));
    if (loading) { return <LoadingSpinner /> }
    else if (error) { 
        console.log(error);
        return "Error"
    }

    return (
        <Page title={"History"}>
            <IndentedParagraph>Previously viewed stops</IndentedParagraph>
            <div>
                <button onClick={clearHistory} className="btn btn-danger btn-sm px-5 font-weight-bold">Clear</button>
                {data.stops.filter(stop => stop != null).map(stop => <StopPreview key={stop.id} stop={stop} />)}
            </div>
        </Page>
    )
}

const History = () => {
    let history = useContext(HistoryContext);
    let [items, setItems] = useState(history.items);

    if (items.length === 0) {
        return <HistoryEmpty />
    } else {
        return <HistoryExists stops={items} setStops={setItems} />
    }

}

export default History;