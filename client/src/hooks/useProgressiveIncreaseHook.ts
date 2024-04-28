import { useEffect, useState } from "react";

// Custom hook for managing a progress from 0 to 100
function useProgressiveIncrease(
  startDelay = 0,
  duration = 1000,
  stepDelay = 10
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevValue) => {
          if (prevValue < 100) {
            return prevValue + 1;
          } else {
            clearInterval(interval);
            return 100;
          }
        });
      }, stepDelay);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(handle);
  }, [startDelay, duration, stepDelay]);

  return progress;
}

export default useProgressiveIncrease;