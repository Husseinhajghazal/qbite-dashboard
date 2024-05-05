"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Shape4 = ({ link, className }: { link: string; className: string }) => {
  return (
    <motion.div
      initial={{ x: className == "shape-4" ? -100 : "100", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 50,
      }}
      className={className}
    >
      <Image src={link} alt="circle" width={450} height={450} />
    </motion.div>
  );
};

export default Shape4;
