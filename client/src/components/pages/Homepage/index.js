import React from "react";
import "./style.css";
function Profile() {
  return (
   <div className="contanier">
     <div className="row">
      <div className="col-2 side-col">
      <h4 className="brand">Secure Security</h4>
      <div className="button-bundle">
      <button type="button" class="btn btn-outline-warning btn1">Home</button>
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

export default Profile;
