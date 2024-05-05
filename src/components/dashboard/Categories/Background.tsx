import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Background = ({
  onClick,
  setCategoryToEdit,
}: {
  onClick: () => void;
  setCategoryToEdit: () => void;
}) => {
  const backgroundElement = document.getElementById("background")!;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 z-10 w-screen h-screen bg-[#0000004c] text-orange-500"
      onClick={() => {
        onClick();
        setCategoryToEdit();
      }}
    />,
    backgroundElement
  );
};

export default Background;
