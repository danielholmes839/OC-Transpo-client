import React, { useState } from "react";
import { Link, Redirect  } from "react-router-dom";
import { gql } from "apollo-boost";
import { useAuth } from "../context/auth";
import client from "../Client";
import { Error } from "../components/Alerts";

const Login = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState({ error: false, message: "" })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    const loginQuery = async () => {
        try {
            const { data } = await client.query({
                query: gql`
                    query {
                        login: User_login(email:"${email}", password: "${password}") {
                            token
                        }
                    }
                `
            });
            setError({ error: false, message: "" })
            setAuthTokens({ token: data.login.token });
            setLoggedIn(true);
        } catch (error) {
            setLoggedIn(false);
            setAuthTokens({ token: null });
            setError({ error: true, message: "Login Failed" });
        }
    }

    return (
        <div className="card px-4 py-2 m-3">
            <div className="form">
                <h1 className="h3 mb-3 font-weight-bold">Login</h1>

                <div className="my-3">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <div className="my-2">
                        <button className="btn btn-lg btn-block btn-outline-success font-weight-light" onClick={loginQuery}>Login</button>
                    </div>

                    {error.error &&
                        <Error>
                            {error.message}
                        </Error>
                    }
                    <div className="mt-3">
                        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    </div>
                </div>
            </div>
            {isLoggedIn && <Redirect to="/user"/>}
        </div>

        
    )
}

export default Login;