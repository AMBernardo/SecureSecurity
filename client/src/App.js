import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/login/index";
import Homepage from "./components/pages/Homepage/HomeComponent/FlagForm";
import CreateEmployee from "./components/pages/Homepage/HomeComponent/CreateEmployee";
import Signup from "./components/pages/signup/Signup";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/homepage/profile" component={CreateEmployee} />
        <Route exact path="/homepage" component={Homepage} />
      </div>
    </Router>
  );
}

export default App;
