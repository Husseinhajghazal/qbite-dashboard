import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const EmojiPicker = ({
  x,
  y,
  icon,
  onChange,
}: {
  x: string;
  y: string;
  icon: string;
  onChange: (e: any) => void;
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="text-[30px] cursor-pointer w-10"
      >
        {icon}
      </button>
      <div className={showPicker ? `absolute ${x} ${y}` : "hidden"}>
        <Picker
          data={data}
          previewPostion="none"
          onEmojiSelect={(e: any) => {
            onChange(e.native);
            setShowPicker(!showPicker);
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default EmojiPicker;
