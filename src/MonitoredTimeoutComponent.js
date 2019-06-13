import React from "react";
import PropTypes from "prop-types";
import { useTimeout } from "./hooks/useTimeout";

/**
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} monitor, function to execute as a monitor
 * @param {function} onWarning, function to execute when the warning occurs
 * @param {function} onTimeout, function to execute when the timeout occurs
 * @param {number} monitorDuration milliseconds the monitoring starts before the timeout, defaults to 1000 ms.
 * @param {number} warningDuration milliseconds the warning occurs before the timeout, defaults to 1000 ms.
 * @param {number} timeoutIn milliseconds till the timeout, defaults to 10000 ms.
 */
const MonitoredTimeoutComponent = React.memo(
  ({
    monitor,
    onWarning,
    onTimeout,
    monitorDuration,
    warningDuration,
    timeoutIn
  }) => {
    useTimeout(onTimeout, timeoutIn);
    useTimeout(monitor, Math.max(timeoutIn - monitorDuration, 0));
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    //const [count, setCount] = useState(0);
    //monitor();
    return <p>{"hello"}</p>;
  }
);

MonitoredTimeoutComponent.propTypes = {
  monitor: PropTypes.func.isRequired,
  onWarning: PropTypes.func.isRequired,
  onTimeout: PropTypes.func.isRequired,
  monitorDuration: PropTypes.number,
  warningDuration: PropTypes.number,
  timeoutIn: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  monitor: () => console.log("onMonitor"),
  onWarning: () => console.log("onWarning"),
  onTimeout: () => console.log("onTimeout"),
  monitorDuration: 9000,
  warningDuration: 4000,
  timeoutIn: 10000
};

export default MonitoredTimeoutComponent;
