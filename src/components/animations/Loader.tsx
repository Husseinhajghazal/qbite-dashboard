"use client";

import React, { ReactNode } from "react";
import animationData from "@/Data/Animation - 1697528822814.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const Loader = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="relative flex justify-center">
      <Lottie options={defaultOptions} width={width} height={height} />
      <div className="absolute z-[10] bottom-12 w-[50px]">{children}</div>
    </div>
  );
};

export default Loader;
