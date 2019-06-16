import React from "react";
import PropTypes from "prop-types";
import { useTimeout } from "./hooks/useTimeout";
import Modal from "./Modal";
import useModal from "./hooks/useModal";

/**
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} monitorDate, function to execute as a monitorDate
 * @param {number} monitorDuration milliseconds the monitoring starts before the timeout, defaults to 1000 ms.
 * @param {number} warningDuration milliseconds the warning occurs before the timeout, defaults to 1000 ms.
 * @param {number} timeoutIn milliseconds till the timeout, defaults to 10000 ms.
 */
const MonitoredTimeoutComponent = React.memo(
  ({
    monitorDate,
    monitorDuration,
    warningDuration,
    timeoutIn
  }) => {
    // moment komt binnen = expiratie moment. Warning = expiratie - warning. Monitor = expiratie - monitor
    const warningMoment = monitorDate - warningDuration;
    const monitorMoment = monitorDate - monitorDuration;

    const { isShowing, showModal, content } = useModal(); // causes a rerender on every change, so never stops
    const onWarning = () => showModal(true, "Warning, your session will time out soon.");
    const onTimeout = () => showModal(true, "Your session has expired.");

    useTimeout(onTimeout, timeoutIn);
    useTimeout(monitorDate, Math.max(timeoutIn - monitorDuration, 0));
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    return (<Modal isShowing={isShowing} showModal={showModal} content={content} />);
  });

MonitoredTimeoutComponent.propTypes = {
  monitorDate: PropTypes.func.isRequired,
  monitorDuration: PropTypes.number,
  warningDuration: PropTypes.number,
  timeoutIn: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  monitorDate: () => console.log("onMonitor"),
  monitorDuration: 9000,
  warningDuration: 4000,
  timeoutIn: 10000
};

export default MonitoredTimeoutComponent;
