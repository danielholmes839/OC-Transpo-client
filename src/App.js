import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import client from './graphql/client';

// Routing
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute.jsx";
import Nav from "./routing/Nav";

// pages
import { Home, Login, Signup, Stop, StopRoute, Dashboard } from "./pages/index";

import Container from "react-bootstrap/Container"
// contexts
import { AuthContext } from "./context/auth";

const Test = () => {
  let { id } = useParams();
  return (
    <p>{id}</p>
  )
}

const App = () => {
  const localAuthData = JSON.parse(localStorage.getItem("tokens"));
  const [authData, setAuthData] = useState(localAuthData);

  const set = (authData) => {
    localStorage.setItem("tokens", JSON.stringify(authData));
    setAuthData(authData);
  }

  return (

    <AuthContext.Provider value={{ authData, setAuthData: set }}>
      <ApolloProvider client={client}>
        <Router basename="/app">
          <Nav />
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/stop/:id" component={Stop} />
            <Route path="/stoproute/:id" component={StopRoute} />
            <Route path="/stoptime/:id" component={Test} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/favouritestop/:id" component={Test} />
          </Container>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider >

  );
}

export default App;