import React, { useState } from "react";
import PropTypes from "prop-types";
import { useInterval } from "./hooks/useInterval";
import { formatMsAsHMS } from "./utils/timeUtils";

const ONE_SECOND = 1000;

const AutoCountdownComponent = React.memo(
  ({ countdownFrom, countdownTo, formatFn }) => {
    const [count, setCount] = useState(countdownFrom);

    useInterval(() => {
      setCount(count > countdownTo ? count - ONE_SECOND : count);
    }, ONE_SECOND);

    return <React.Fragment>{formatFn(count)}</React.Fragment>;
  }
);

AutoCountdownComponent.propTypes = {
  countdownFrom: PropTypes.number,
  countdownTo: PropTypes.number,
  formatFn: PropTypes.func
};

AutoCountdownComponent.defaultProps = {
  countdownFrom: 10000,
  countdownTo: 0,
  formatFn: formatMsAsHMS
};

export default AutoCountdownComponent;
