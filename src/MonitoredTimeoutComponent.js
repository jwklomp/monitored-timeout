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
 */
const MonitoredTimeoutComponent = React.memo(
  ({
    monitorDate,
    monitorDuration,
    warningDuration
  }) => {
    const timeoutIn = monitorDate - Date.now();

    const { isShowing, showModal, content } = useModal();
    const onWarning = () => showModal(true, "Warning, your session will time out soon.");
    const onTimeout = () => showModal(true, "Your session has expired.");

    useTimeout(onTimeout, timeoutIn);
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    return (<Modal isShowing={isShowing} showModal={showModal} content={content} />);
  });

MonitoredTimeoutComponent.propTypes = {
  monitorDate: PropTypes.number.isRequired,
  monitorDuration: PropTypes.number,
  warningDuration: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  monitorDuration: 9000,
  warningDuration: 4000
};

export default MonitoredTimeoutComponent;
