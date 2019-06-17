import React from "react";
import PropTypes from "prop-types";
import { useTimeout } from "./hooks/useTimeout";
import Modal from "./Modal";
import useModal from "./hooks/useModal";
import AutoCountdownComponent from "./AutoCountdownComponent";

/**
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} monitorDate, function to execute as a monitorDate
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

    const warningContent = () =>
      <p>Your session will expire in: <AutoCountdownComponent countdownFrom={warningDuration} /> </p>;

    const onWarning = () => showModal(true, warningContent());
    const onTimeout = () => showModal(true, "Your session has expired.");

    useTimeout(onTimeout, timeoutIn);
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    return (<Modal isShowing={isShowing} showModal={showModal} content={content} />);
  });

MonitoredTimeoutComponent.propTypes = {
  monitorDate: PropTypes.number.isRequired,
  warningDuration: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  warningDuration: 10000
};

export default MonitoredTimeoutComponent;
