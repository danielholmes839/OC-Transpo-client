import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="card w-25 px-4 py-2 m-3">
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-bold">Sign up</h1>
                
                <div className="my-3">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                </div>

                <div className="my-3">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                </div>
                <div className="my-3">
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required />
                </div>
                <div>
                    <div>
                        <button className="btn btn-lg btn-block btn-outline-success font-weight-light">Sign up!</button>
                    </div>
                    <div className="mt-3">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;