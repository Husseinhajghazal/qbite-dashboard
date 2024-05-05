import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StepsLine = ({
  step,
  nextStep,
}: {
  step: number;
  nextStep: (num: number) => void;
}) => {
  return (
    <div className="hidden md:flex items-center mb-16">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className={`w-8 h-8 rounded-full cursor-pointer bg-[#2f834f] text-white flex items-center justify-center mx-[10px] ${
          step == 1 ? "shadow-md" : null
        }`}
      >
        1
      </motion.div>
      <AnimatePresence>
        {step > 1 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-[#2f834f]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step == 1 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-white"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center mx-[10px] ${
          step > 1 ? "bg-[#2f834f] text-white" : "bg-[#fff] text-black"
        } ${step == 2 ? "shadow-md" : null}`}
        onClick={() => {
          if (step > 2) {
            nextStep(2);
          }
        }}
      >
        2
      </motion.div>
      <AnimatePresence>
        {step > 2 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-[#2f834f]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step <= 2 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-white"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center mx-[10px] ${
          step > 2 ? "bg-[#2f834f] text-white" : "bg-[#fff] text-black"
        } ${step == 3 ? "shadow-md" : null}`}
        onClick={() => {
          if (step > 3) {
            nextStep(3);
          }
        }}
      >
        3
      </motion.div>
      <AnimatePresence>
        {step > 3 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-[#2f834f]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step <= 3 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-white"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center mx-[10px] ${
          step > 3 ? "bg-[#2f834f] text-white" : "bg-[#fff] text-black"
        } ${step == 4 ? "shadow-md" : null}`}
        onClick={() => {
          if (step > 4) {
            nextStep(4);
          }
        }}
      >
        4
      </motion.div>
      <AnimatePresence>
        {step > 4 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-[#2f834f]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step <= 4 && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 50,
            }}
            className="w-[100px] h-1 bg-white"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center mx-[10px] ${
          step > 4 ? "bg-[#2f834f] text-white" : "bg-[#fff] text-black"
        } ${step == 5 ? "shadow-md" : null}`}
      >
        5
      </motion.div>
    </div>
  );
};

export default StepsLine;
