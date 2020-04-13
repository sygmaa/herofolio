import { useState, useEffect } from "react";

const useSizes = () => {
  const [height, setHeight] = useState(window?.innerHeight);
  const [width, setWidth] = useState(window?.innerWidth);

  const onResize = () => {
    setHeight(window?.innerHeight);
    setWidth(window?.innerWidth);
    console.log("window?.innerHeight", window?.innerHeight);
  };

  useEffect(() => {
    window?.addEventListener("resize", onResize);

    if ("onorientationchange" in window) {
      window?.addEventListener("orientationchange", onResize);
    }

    return function cleanUp() {
      window?.removeEventListener("resize", onResize);

      if ("onorientationchange" in window) {
        window?.removeEventListener("orientationchange", onResize);
      }
    };
  }, []);

  return {
    height,
    width
  };
};

export default useSizes;
