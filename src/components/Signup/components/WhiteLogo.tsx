"use client";

import Image from "next/image";
import useNextStep from "@/hooks/useNextStep";

const Logo = () => {
  const { step } = useNextStep();

  return (
    <div
      data-aos="fade-left"
      data-aos-duration={500}
      data-aos-delay={600}
      className={`absolute z-[3] top-5 right-5 w-[${
        step == 0 ? "200px" : "0px"
      }] hidden md:block`}
    >
      <Image
        src="/logo/3.png"
        alt="logo"
        width={200}
        height={200}
        className="object-cover"
      />
    </div>
  );
};

export default Logo;
