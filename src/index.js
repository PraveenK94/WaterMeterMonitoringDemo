import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import history from "./history";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";

console.log("hello index.js");

ReactDOM.render(
  <Router history={history}>
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/Dashboard" component={Dashboard} />
      </Switch>
    </div>
  </Router>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
