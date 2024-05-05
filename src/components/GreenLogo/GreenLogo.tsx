import Image from "next/image";
import { motion } from "framer-motion";

const GreenLogo = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 50,
      }}
      className="w-[200px] mb-16"
    >
      <Image
        src="/logo/5.png"
        alt="logo"
        width={200}
        height={200}
        className="object-cover"
      />
    </motion.div>
  );
};

export default GreenLogo;
