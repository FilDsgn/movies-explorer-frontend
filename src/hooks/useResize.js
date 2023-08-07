import { useState, useEffect } from "react";

function useResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (e) => {
      setTimeout(() => setWidth(e.target.innerWidth), 300);
    };
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return {
    width,
  };
}

export default useResize;
