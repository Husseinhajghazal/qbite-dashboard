import React from "react";
import ColorForm from "@/components/Signup/Forms/ColorForm";
import { motion } from "framer-motion";

const ColorScreen = ({ nextStep }: { nextStep: () => void }) => {
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
        Let&apos;s choose colors
      </motion.h1>
      <ColorForm nextStep={nextStep} />
    </div>
  );
};

export default ColorScreen;
