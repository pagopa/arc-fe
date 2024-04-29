import { useState } from 'react';

function useCurrentIndex() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const changeCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };
  return {
    currentIndex,
    changeCurrentIndex
  };
}

export default useCurrentIndex;
