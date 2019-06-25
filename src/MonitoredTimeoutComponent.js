import React from "react";
import PropTypes from "prop-types";
import { useTimeout } from "./hooks/useTimeout";
import ModalComponent from "./ModalComponent";
import useModal from "./hooks/useModal";
import AutoCountdownComponent from "./AutoCountdownComponent";

/**
 * Component that sets up a timeout and displays a modal when with a warning message and timeout message.
 * @param {function} monitorDate, function to execute as a monitorDate
 * @param {number} warningDuration milliseconds the warning occurs before the timeout, defaults to 10000 ms.
 */
const MonitoredTimeoutComponent = React.memo(
  ({
    monitorDate,
    warningDuration
  }) => {
    const timeoutIn = monitorDate - Date.now();

    const warningContent = () =>
      <p>Your session will expire in: <AutoCountdownComponent countdownFrom={warningDuration} /> </p>;

    const { isShowing, showModal, content } = useModal();
    const onWarning = () => showModal(true, warningContent());
    const onTimeout = () => showModal(true, "Your session has expired.");

    useTimeout(onTimeout, timeoutIn);
    useTimeout(onWarning, Math.max(timeoutIn - warningDuration, 0));
    return (<ModalComponent isShowing={isShowing} showModal={showModal} content={content} />);
  });

MonitoredTimeoutComponent.propTypes = {
  monitorDate: PropTypes.number.isRequired,
  warningDuration: PropTypes.number
};

MonitoredTimeoutComponent.defaultProps = {
  warningDuration: 10000
};

export default MonitoredTimeoutComponent;
