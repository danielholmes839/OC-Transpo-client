import React from "react";
import ReactGA from "react-ga"
import "css/bootstrap.css";
import "css/card.css";

// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "api";

// Routing
import { Nav } from "routes";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { homePath, historyPath, searchPath, stopPath, stopRoutePath, stopTimePath } from "routes";
import { Home, History, Search, Stop, StopRoute, StopTime } from "pages";
import { StopHistoryContext, StopHistory } from "context";


const PageView = ({ children, view, Page, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        ReactGA.pageview(view)
        return <Page/>;
      }}
    />
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StopHistoryContext.Provider value={new StopHistory("history", 10)}>
        <Router>
          <Nav />
          <div className="container">
            <Switch>
              <PageView exact view={"/home"} path={homePath} Page={Home} />
              <PageView exact view={"/history"} path={historyPath} Page={History} />
              <PageView exact view={"/search"} path={searchPath} Page={Search} />
              <PageView exact view={"/stop"} path={stopPath} Page={Stop} />
              <PageView exact view={"/stoproute"} path={stopRoutePath} Page={StopRoute} />
              <PageView exact view={"/stoptime"} path={stopTimePath} Page={StopTime} />
              <Redirect to={homePath} />
            </Switch>
          </div>
        </Router>
      </StopHistoryContext.Provider>
    </ApolloProvider>
  );
}

export default App;