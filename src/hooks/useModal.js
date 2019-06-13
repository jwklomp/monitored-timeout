import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const showModal = state => setIsShowing(state);

  return {
    isShowing,
    showModal
  };
};

export default useModal;
