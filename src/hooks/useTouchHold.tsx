import { RefObject, useState, useEffect } from "react";

const useTouchHold = (ref: RefObject<any>) => {
  const [isActive, setIsActive] = useState(false);

  const handleStart = (e: TouchEvent) => {
    if (
      !isActive &&
      ref.current &&
      (ref.current === e.target || ref.current.contains(e.target))
    ) {
      setIsActive(true);
      e.preventDefault();
    }
  };

  const handleEnd = (e: TouchEvent) => {
    if (isActive) {
      e.preventDefault();
    }
    setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleStart);
    document.addEventListener("touchcancel", handleEnd, false);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", handleEnd);
    };
  }, []);

  return isActive;
};

export default useTouchHold;
