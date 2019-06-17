import { useEffect } from "react";

/**
 * Hook that sets up a timeout
 * Arguments are “dynamic”, so code can handle changes in callback or delay.
 * @param {function} callback, function to execute when the timeout occurs
 * @param {number} delay in milliseconds, defaults to 1000 ms.
 */
export const useTimeout = (callback, delay = 1000) => {
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        callback();
      }, delay);
      return () => clearTimeout(timer);
    }
  });
};
