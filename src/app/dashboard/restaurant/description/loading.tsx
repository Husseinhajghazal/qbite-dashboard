import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#dceed8]">
      <div
        style={{
          borderColor: "#2f834f",
          borderRightColor: "transparent",
        }}
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  );
};

export default page;
