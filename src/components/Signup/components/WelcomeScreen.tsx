"use client";

import Image from "next/image";
import Loader from "@/components/animations/Loader";
import { AnimatePresence, motion } from "framer-motion";
import useNextStep from "@/hooks/useNextStep";

const animationVariants = {
  initial: { marginLeft: -500, opacity: 0 },
  animate: { marginLeft: 0, opacity: 1 },
  exit: { marginLeft: 500, opacity: 0 },
};

const WelcomeScreen = () => {
  const { step } = useNextStep();

  return (
    <AnimatePresence>
      {step == 0 && (
        <motion.div
          initial={animationVariants.initial}
          animate={animationVariants.animate}
          exit={animationVariants.exit}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 50,
          }}
          className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        >
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-5">
            Welcome To <span className="text-[#2f834f]">QBite</span>
          </h2>
          <p className="text-lg">Are You Ready?</p>
          {/* <Loader width={200} height={200}>
            <Image
              src="/logo/7.png"
              alt="logo"
              width={300}
              height={300}
              className="object-cover"
            />
          </Loader> */}
          <div
            style={{
              borderColor: "#2f834f",
              borderRightColor: "transparent",
            }}
            className="mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
