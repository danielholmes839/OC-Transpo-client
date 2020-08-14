import React from "react";
import Container from "react-bootstrap/Container"
import "css/bootstrap.css";
import "css/card.css";

// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "api";

// Routing
import { Nav } from "routes";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { homePath, historyPath, searchPath, stopPath, stopRoutePath, stopTimePath } from "routes";
import { Home, History, Search, Stop, StopRoute, StopTime } from "pages";
import { HistoryContext, HistoryManager } from "context";


const App = () => {
  return (
    <ApolloProvider client={client}>
      <HistoryContext.Provider value={new HistoryManager("history", 10)}>
        <Router>
          <div>
            <Nav />
          </div>
          <Container>
            <Route exact path="/"><Redirect to={homePath} /></Route>
            <Route exact path={homePath} component={Home} />
            <Route exact path={historyPath} component={History} />
            <Route exact path={searchPath} component={Search} />
            <Route path={stopPath} component={Stop} />
            <Route path={stopRoutePath} component={StopRoute} />
            <Route path={stopTimePath} component={StopTime} />
          </Container>
        </Router>
      </HistoryContext.Provider>
    </ApolloProvider>
  );
}

export default App;