"use client";

import useNextStep from "@/hooks/useNextStep";

const Shape3 = () => {
  const { step } = useNextStep();

  return (
    <div
      data-aos-duration={500}
      data-aos-delay={600}
      data-aos="fade-down"
      className={`${
        step == 0 ? "0" : "-1"
      } custom-shape-divider-top-1697451570 hidden md:block`}
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export default Shape3;
