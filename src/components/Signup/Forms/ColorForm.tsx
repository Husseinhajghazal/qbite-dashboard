import React, { useState } from "react";
import Input from "@/components/Input/Input";
import { motion } from "framer-motion";
import Button from "../../Buttons/Button";

const ColorForm = ({ nextStep }: { nextStep: (e: any) => void }) => {
  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem("primaryColor") || "#ffffff"
  );
  const [secondaryColor, setSecondaryColor] = useState(
    localStorage.getItem("secondaryColor") || "#ffffff"
  );
  const [thirdColor, setThirdColor] = useState(
    localStorage.getItem("backgroundColor") || "#ffffff"
  );

  return (
    <React.Fragment>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
        }}
        className="mb-6 flex gap-5 justify-center"
      >
        <Input
          type="color"
          className=""
          placeholder="Primary Color"
          value={primaryColor}
          onBlur={() => {}}
          onChange={(e) => {
            localStorage.setItem("primaryColor", e.target.value);
            setPrimaryColor(e.target.value);
          }}
          id="mainColor"
          valid={true}
          error=""
        />
        <Input
          type="color"
          className=""
          placeholder="Secondary Color"
          value={secondaryColor}
          onBlur={() => {}}
          onChange={(e) => {
            localStorage.setItem("secondaryColor", e.target.value);
            setSecondaryColor(e.target.value);
          }}
          id="mainColor"
          valid={true}
          error=""
        />
        <Input
          type="color"
          className=""
          placeholder="Background Color"
          value={thirdColor}
          onBlur={() => {}}
          onChange={(e) => {
            localStorage.setItem("backgroundColor", e.target.value);
            setThirdColor(e.target.value);
          }}
          id="mainColor"
          valid={true}
          error=""
        />
      </motion.div>
      <Button onClick={nextStep} />
    </React.Fragment>
  );
};

export default ColorForm;
