import React from "react";
import PropTypes from "prop-types";
import { useTimeout } from "./hooks/useTimeout";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

/**
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} monitor, function to execute as a monitor
 * @param {function} onWarning, function to execute when the warning occurs
 * @param {function} onTimeout, function to execute when the timeout occurs
 * @param {number} monitorDuration milliseconds the monitoring starts before the timeout, defaults to 1000 ms.
 * @param {number} warningDuration milliseconds the warning occurs before the timeout, defaults to 1000 ms.
 * @param {number} timeoutIn milliseconds till the timeout, defaults to 10000 ms.
 */
const MonitoredTimeoutComponent =
  ({
    monitor,
    monitorDuration,
    warningDuration,
    timeoutIn
  }) => {

    const { isShowing, showModal, content } = useModal();
    const onWarning = () => showModal(true, "Warning, your session will time out soon.");
    const onTimeout = () => showModal(true, "Your session has expired.");

    useTimeout(onTimeout, timeoutIn);
    useTimeout(monitor, Math.max(timeoutIn - monitorDuration, 0));
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    return (<Modal isShowing={isShowing} showModal={showModal} content={content} />);
  };

MonitoredTimeoutComponent.propTypes = {
  monitor: PropTypes.func.isRequired,
  monitorDuration: PropTypes.number,
  warningDuration: PropTypes.number,
  timeoutIn: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  monitor: () => console.log("onMonitor"),
  monitorDuration: 9000,
  warningDuration: 4000,
  timeoutIn: 10000
};

export default MonitoredTimeoutComponent;
