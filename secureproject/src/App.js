import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/login/index";
import Profile from "./components/pages/porfile/index";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <Router>
      <div>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/login-signup" component={Login} />
        <Route exact path="/homepage" component={Profile} />
        <Route path="/contact" component={Contact} />
      </div>
    </Router>
  );
}

export default App;
