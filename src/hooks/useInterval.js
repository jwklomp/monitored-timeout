import { useEffect, useRef } from "react"; // useRef = 

/**
 * Hook that sets up an interval and runs the callback on each interval.
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} callback, function to execute on each interval
 * @param {number} delay in milliseconds, defaults to 1000 ms.
 */
export const useInterval = (callback, delay = 1000) => {
  // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
  // The returned object will persist for the full lifetime of the component.
  const savedCallback = useRef();

  // Remember the latest callback. Reruns when callback changes (because specified in dependencies array).
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval. Reruns when delay changes (because specified in dependencies array).
  useEffect(() => {
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
