import React, { useState } from "react";
import ReactDOM from "react-dom";
import MonitoredTimeoutComponent from "./MonitoredTimeoutComponent";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(Date.now() + 15000);


  const handleClick = () => {
    setCount(count + 1);
    setDate(Date.now() + 15000);
  }

  return (
    <div className="App">
      <h1>Counter</h1>
      <p>You clicked {count} times</p>
      <button className="btn btn-primary" onClick={handleClick}>Click me</button>
      <MonitoredTimeoutComponent
        monitorDate= {date}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
