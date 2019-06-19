import { useState } from "react";

/**
 * Hook for showing and hiding a modal component and set it's content
 * @returns {object} value of isShowing, show function and content from the Hook, so the component can access them
 */
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();

  const showModal = (state, content) => {
    setIsShowing(state);
    setContent(content);
  }

  return {
    isShowing,
    showModal,
    content
  };
};

export default useModal;
