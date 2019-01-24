import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Login() {
  return (
   <div className="container shadow-lg p-3 mb-5 border-0 border-warning">
      <form className="form1">
    <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
    </div>
    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <Link to="/homepage" className={window.location.pathname === "/homepage"} >
    <button type="submit" className="btn btn-primary">Submit</button>
    </Link>
  </form>
   </div>
  );
}

export default Login;
