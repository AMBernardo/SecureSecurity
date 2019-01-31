import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
function Nav(props) {
  return (
   <div className="contanier">
     <div className="row">
      <div className="col-2 side-col">
      <h4 className="brand">Secure Security</h4>
      <div className="button-bundle">
      <Link to={`${props.match.url} /employee`}>
      <button type="button" class="btn btn-outline-warning btn1">Home</button>
      </Link>
      <button type="button" class="btn btn-outline-warning btn2">Profile</button>
      <button type="button" class="btn btn-outline-warning btn3">Settings</button>
      </div>
      </div>
      <div className="col-10 top-col">

      </div>
     </div>
   </div>
  );
}

export default Nav;
