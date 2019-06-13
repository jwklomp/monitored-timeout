import { useState } from "react";

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
