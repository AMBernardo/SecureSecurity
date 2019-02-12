import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-12 text-center first-col">
    <div className="border-bottom border-warning">
    <h1 className="head1">Secure Security</h1>
    <p>Where We Keep You Safe</p>
    </div>

   <Link to="/login" className={window.location.pathname === "/login"} >
   <button className="btn btn-warning first-btn"> 
   Login
   </button> 
   </Link>
   <Link to="/signup" className={window.location.pathname === "/signup"} >
   <button className="btn btn-warning sec-btn"> 
   SignUP
   </button> 
   </Link>
    </div>
    <div className="col-12 text-left sec-col">
    <div className="head2">
    <h1>What is Secure Security? </h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur voluptas, quos soluta unde nisi, aliquam accusantium reiciendis commodi suscipit sunt laudantium hic? Enim praesentium sint nam deserunt libero maiores laboriosam!</p>
    </div>
   </div>
   <div className="col-12 text-right third-col">
<div className="head3">
   <h1>Keep your money safe.</h1>
   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab odit ut ipsam magni veritatis tenetur odio eaque earum fugiat dolores nam culpa dolorum, nisi, officiis ea impedit mollitia deleniti quas?</p>
   </div>
   </div>

   <div className="col-12 fourth-col">
    <h2 className="text-center">What makes Secure Security secure?</h2>
    <p className="fourth-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam nulla neque commodi eius architecto, minima cumque nobis, iste aspernatur laborum earum molestiae sit deserunt harum, qui doloremque illo accusamus quae.</p>
   </div>
    </div>
    </div>
    


  

  
 
  
  );
}

export default Home;

