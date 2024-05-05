"use client";

import { useEffect, useState } from "react";

const useShowAfter = ({ time }: { time: number }) => {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAfter(true);
    }, time);
    return () => clearTimeout(timeoutId);
  }, [time]);

  return { showAfter };
};

export default useShowAfter;
