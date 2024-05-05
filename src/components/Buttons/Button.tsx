"use client";

import { BsArrowRightCircleFill } from "react-icons/bs";

const Button = ({ onClick }: { onClick: (e: any) => void }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex items-center gap-2 bg-gray-100 p-2 pr-5 mx-auto font-medium rounded-full hover:bg-[#2f834f] hover:text-white duration-300"
    >
      <BsArrowRightCircleFill size={30} /> <span>Submit</span>
    </button>
  );
};

export default Button;
