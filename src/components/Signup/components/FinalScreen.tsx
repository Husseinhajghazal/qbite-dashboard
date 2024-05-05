import React from "react";
import FinalForm from "@/components/Signup/Forms/FinalForm";
import { motion } from "framer-motion";

const FinalScreen = ({ nextStep }: { nextStep: () => void }) => {
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
        className="text-4xl font-semibold mb-10 px-3"
      >
        Okay, now let&apos;s finish this
      </motion.h1>
      <FinalForm nextStep={nextStep} />
    </div>
  );
};

export default FinalScreen;
