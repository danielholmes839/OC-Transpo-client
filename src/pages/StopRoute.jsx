import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Page, IndentedParagraph, Section, ErrorPage, ErrorMessage, StopTimeList, BusList, LiveBusMap, LoadingSpinner } from "components";
import { stopRouteQuery, stopRouteScheduleQuery } from "api"
import { stopTimePattern } from "routes";


const btnClass = "btn btn-sm btn-primary font-weight-bold px-4 my-1 mr-2 text-white"
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Table = ({ stopTimes }) => {
  let day = new Date().getDay();
  return (
    <table className="table table-sm table-responsive-sm table-fixed">
      <thead className="border-0">
        <tr>
          {days.map(day => <th scope="col">{day}</th>)}
          <th scope="col">Last Day</th>
        </tr>
      </thead>

      <tbody>
        {
          stopTimes.map(stopTime => {
            return (
              <tr>
                {stopTime.service.runningOnMany.map((runningOnDay, i) => {
                  let borderClass = (i === day) ? "table-border-left" : ""
                  if (runningOnDay && stopTime.time.passed) {
                    return (
                      <td className={borderClass}>
                        <Link to={stopTimePattern(stopTime.id)} style={{ color: "#595959" }}>
                          {stopTime.time.string}
                        </Link>
                      </td>
                    );
                  } else if (runningOnDay) {
                    return <td className={borderClass}><Link to={stopTimePattern(stopTime.id)}>{stopTime.time.string}</Link></td>;
                  } else {
                    return <td className={borderClass}><span style={{ color: "#CCCCCC" }}>---</span></td>;
                  }
                })}
                <td style={{ minWidth: 100 }}>
                  {stopTime.service.service.end.string}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
const FullSchedule = ({ id }) => {
  let { data, error } = useQuery(stopRouteScheduleQuery(id));
  let [hidden, setHidden] = useState(false)
  if (data) {
    let stopTimes = data.stopRoute.schedule.all;

    return (
      <Section title={"Schedule"}>
        {!hidden &&  (
          <div>
            <button className={btnClass + " mb-3"} onClick={() => setHidden(true)}>Hide Schedule</button> 
            <Table stopTimes={stopTimes}/>
          </div>
        )}
        {hidden && <button className={btnClass} onClick={() => setHidden(false)}>Show Schedule</button>}

      </Section>
    )
  } else if (error) {
    return <ErrorMessage>Could not load schedule</ErrorMessage>
  } else {
    return <LoadingSpinner />
  }
}

const FullScheduleWrapper = ({ id }) => {
  let [show, setShow] = useState(false);

  return (
    <div>
      {show ? (
        <FullSchedule id={id} />
      ) : (
          <button className={btnClass} onClick={() => setShow(true)}>Get Full Schedule</button>
        )}
    </div>
  )
}
const StopRoute = () => {
  let { id } = useParams();
  let { data, error, loading } = useQuery(stopRouteQuery(id));

  // Apollo loading or error
  if (loading) { return <LoadingSpinner /> }
  else if (error || data.stopRoute == null) { return <ErrorPage title={"Route Error"}>Route with id "{id}" could not be found</ErrorPage> }

  const { stopRoute } = data;
  const { stop, route, liveBusData } = stopRoute;

  return (
    <Page title={`${stopRoute.number} ${stopRoute.headsign}`}>
      {/* <StopRouteSign route={route} headsign={stopRoute.headsign} /> */}
      <Section>
        <IndentedParagraph>Stop #{stop.code} ({stop.name})</IndentedParagraph>
      </Section>
      <Section title={"Next Stops"}>
        <IndentedParagraph>
          <StopTimeList stopTimes={stopRoute.schedule.next} number={stopRoute.number} headsign={stopRoute.headsign} />
        </IndentedParagraph>
        <FullScheduleWrapper id={id} />
      </Section>

      {data.stopRoute.liveBusData.busCount === 0 && (
        <Section title="Live Bus Data">
          <ErrorMessage>There is no live bus data available</ErrorMessage>
        </Section>
      )}

      {data.stopRoute.liveBusData.busCount > 0 && (
        <Section title="Live Bus Data">
          {liveBusData.buses.length > 0 && 
          <p className="text-muted">
            The location of buses can be updated every 30 seconds. 
            The scheduled time for buses is more accurate than the time below.
          </p>}
          <IndentedParagraph>
            <BusList buses={liveBusData.buses} route={route} />
          </IndentedParagraph>
          {stopRoute.map !== null && (<LiveBusMap map={stopRoute.map} />)}
          {stopRoute.map === null && (<ErrorMessage>Live map could not be created. No GPS data is available</ErrorMessage>)}
        </Section>
      )}
    </Page>
  )
}

export default StopRoute;