import { useState } from 'react';

function useModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hide = () => {
    setIsVisible(false);
  };

  const show = () => {
    setIsVisible(true);
  };

  return { isVisible, hide, show };
}

export default useModal;
