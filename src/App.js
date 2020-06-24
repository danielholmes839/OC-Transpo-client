import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';


// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import client from './Client';

// Routing
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// pages
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home";
import User from "./pages/User";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StopRoute from "./pages/StopRoute";
import Stop from "./pages/Stop";

// contexts
import { AuthContext } from "./context/auth";

const Test = (props) => {
  let { id } = useParams();
  return (
    <p>{id}</p>
  )
}

const App = (props) => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (

    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <ApolloProvider client={client}>
        <Router>
          <Nav />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/stop/:id" component={Stop} />
            <Route path="/stoproute/:id" component={StopRoute} />
            <Route path="/stoptime/:id" component={Test} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/favouritestop/:id" component={Test} />
          </div>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider >

  );
}

export default App;