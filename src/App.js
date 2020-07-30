import React from "react";
import Container from "react-bootstrap/Container"
import "bootstrap/dist/css/bootstrap.min.css";
import "css/card.css";

// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "api";

// Routing
import { Nav } from "routes";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, History, Search, Stop, StopRoute } from "pages";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Container>
          <Route exact path="/"><Redirect to="/home"/></Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/history" component={History} />
          <Route exact path="/search" component={Search} />
          <Route path="/stop/:id" component={Stop} />
          <Route path="/stoproute/:id" component={StopRoute} />
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;