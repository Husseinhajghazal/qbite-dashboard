import React from "react";
import ConfirmationForm from "@/components/Signup/Forms/ConfirmationForm";
import { motion } from "framer-motion";

const ConfirmScreen = ({ nextStep }: { nextStep: () => void }) => {
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
        Let&apos;s Confirm Your Account
      </motion.h1>
      <ConfirmationForm nextStep={nextStep} />
    </div>
  );
};

export default ConfirmScreen;
