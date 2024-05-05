import { useEffect, useState } from "react";

const useNextStep = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const timeoutId = setTimeout(() => {
      setStep(token ? 2 : 1);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return { step, setStep };
};

export default useNextStep;
