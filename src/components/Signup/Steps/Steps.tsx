"use client";

import { AnimatePresence } from "framer-motion";
import GreenLogo from "@/components/GreenLogo/GreenLogo";
import ConfirmScreen from "@/components/Signup/components/ConfirmScreen";
import InfoScreen from "@/components/Signup/components/InfoScreen";
import ColorScreen from "@/components/Signup/components/ColorScreen";
import ImageScreen from "@/components/Signup/components/ImageScreen";
import FinalScreen from "@/components/Signup/components/FinalScreen";
import StepsLine from "@/components/Signup/components/StepsLine";
import useNextStep from "@/hooks/useNextStep";
import LanguageSwitcher from "@/components/Buttons/LanguageSwitcher";

const Steps = () => {
  const { step, setStep } = useNextStep();

  return (
    <AnimatePresence>
      {step >= 1 && <GreenLogo />}
      {step >= 1 && <StepsLine step={step} nextStep={(num) => setStep(num)} />}
      {step >= 1 && <LanguageSwitcher x="right" y="top" />}
      {step == 1 && <ConfirmScreen nextStep={() => setStep(2)} />}
      {step == 2 && <InfoScreen nextStep={() => setStep(3)} />}
      {step == 3 && <ColorScreen nextStep={() => setStep(4)} />}
      {step == 4 && <FinalScreen nextStep={() => setStep(5)} />}
      {step == 5 && <ImageScreen />}
    </AnimatePresence>
  );
};

export default Steps;
