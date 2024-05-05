import React from "react";
import InfoForm from "@/components/Signup/Forms/InfoForm";
import { motion } from "framer-motion";

const InfoScreen = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <div className="w-full text-center">
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className="text-4xl font-semibold mb-10"
      >
        Basic Data About Your Restaurant
      </motion.h1>
      <InfoForm nextStep={nextStep} />
    </div>
  );
};

export default InfoScreen;
