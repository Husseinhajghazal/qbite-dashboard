import React from "react";
import ImageForm from "../Forms/ImageForm";
import { motion } from "framer-motion";

const ImageScreen = () => {
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
        className="text-4xl font-semibold mb-10 px-2"
      >
        Don&apos;t wanna use your photos?
      </motion.h1>
      <ImageForm />
    </div>
  );
};

export default ImageScreen;
