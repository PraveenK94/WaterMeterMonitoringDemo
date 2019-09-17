import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
      </div>
    );
  }
}

console.log("hello app.js");

export default App;
