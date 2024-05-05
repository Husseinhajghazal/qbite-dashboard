import React from "react";

interface Props {
  className: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  valid: string | boolean | undefined;
  error: string | undefined;
  array: null | any[];
}

const SelectInput: React.FC<Props> = ({
  className,
  id,
  value,
  onChange,
  onBlur,
  valid,
  error,
  placeholder,
  array,
}) => {
  return (
    <div className={className}>
      <select
        onChange={onChange}
        id={id}
        onBlur={onBlur}
        value={value}
        className={`border-2 w-full rounded-full py-2 px-4 outline-none duration-300 appearance-none hover:appearance-none ${
          valid
            ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
            : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
        }`}
      >
        <option value="">{placeholder}</option>
        {array?.map((e) => (
          <option value={e.id} key={e.id} className="appearance-none">
            {e.icon} {e.name.fallback}
          </option>
        ))}
      </select>
      {valid && (
        <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
