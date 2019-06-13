import React, { useState } from "react";
import ReactDOM from "react-dom";
import MonitoredTimeoutComponent from "./MonitoredTimeoutComponent";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

import "./styles.css";

const App = () => {
  const [count, setCount] = useState(0);
  const { isShowing, showModal } = useModal(false);

  // most elegant would be to have the rerender coincide with user input
  return (
    <div className="App">
      <h1>Counter</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <MonitoredTimeoutComponent
        monitor={() => console.log(`monitoring: ${count}`)}
        onWarning={() => showModal(true)}
      />
      <Modal isShowing={isShowing} showModal={showModal} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
