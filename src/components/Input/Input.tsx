import React, { ForwardedRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import { motion } from "framer-motion";
import { PiCameraPlusLight } from "react-icons/pi";
import Image from "next/image";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useTranslation } from "react-i18next";

interface Props {
  className: string;
  placeholder: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  valid: string | boolean | undefined;
  error: string | undefined;
}

const Input: React.FC<Props> = ({
  className,
  type,
  id,
  value,
  onChange,
  onBlur,
  valid,
  error,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const [t, i18n] = useTranslation("global");

  if (type == "email" || type == "text") {
    return (
      <div className={className}>
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`border-2 w-full rounded-full py-2 px-4 outline-none duration-300 ${
            valid
              ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
              : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
          }`}
        />
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }

  if (type == "number") {
    return (
      <div className={className}>
        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`border-2 w-full rounded-full py-2 px-4 outline-none duration-300 ${
            valid
              ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
              : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
          }`}
        />
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }

  if (type == "password") {
    return (
      <div className={`${className} relative`}>
        <input
          type={visible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`flex border-2 w-full rounded-full py-2 px-4 outline-none duration-300 ${
            valid
              ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
              : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
          }`}
        />
        {visible ? (
          <AiOutlineEye
            className={`${
              i18n.language == "ar" ? "left-3" : "right-3"
            } absolute top-3 cursor-pointer text-gray-500`}
            size={20}
            onClick={() => setVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className={`${
              i18n.language == "ar" ? "left-3" : "right-3"
            } absolute top-3 cursor-pointer text-gray-500`}
            size={20}
            onClick={() => setVisible(true)}
          />
        )}
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }

  if (type == "phonenumber") {
    return (
      <div className={className}>
        <div
          className={`border-2 w-full bg-white rounded-full py-2 px-4 outline-none duration-300 ${
            valid
              ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
              : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
          }`}
        >
          <PhoneInput
            onBlur={onBlur}
            defaultCountry="TR"
            placeholder={placeholder}
            onChange={(value) => {
              onChange(value);
            }}
            value={value}
          />
        </div>
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }

  if (type == "color") {
    return (
      <div>
        <p className="mb-1 text-sm md:text-base">{placeholder}</p>
        <input type="color" id={id} value={value} onChange={onChange} />
      </div>
    );
  }

  if (type == "textarea") {
    return (
      <div className={className}>
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className={`border-2 w-full rounded-2xl py-2 px-4 outline-none duration-300 ${
            valid
              ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
              : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
          }`}
          rows={3}
        />
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }

  if (type == "time") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          sx={{
            textAlign: i18n.language == "ar" ? "end" : "start",
          }}
          components={["DateTimePicker"]}
        >
          <DemoItem label={placeholder}>
            <MobileTimePicker
              slots={{
                textField: (props: any) => {
                  const { readOnly, ...rest } = props;
                  return (
                    <input
                      {...rest}
                      InputProps={{ readOnly: readOnly }}
                      type="text"
                      className={`border-2 w-full bg-transparent rounded-full py-2 px-4 outline-none duration-300 ${
                        valid
                          ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
                          : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
                      }`}
                    />
                  );
                },
              }}
              onChange={onChange}
              defaultValue={dayjs(value)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  if (type == "image") {
    return (
      <div>
        <div
          className={`mx-auto overflow-hidden flex relative cursor-pointer font-semibold shadow-md ${className}`}
        >
          <div className="absolute bg-white/90 w-full flex items-center justify-between px-3 py-1">
            <p>{id}</p>
            <motion.span
              whileHover={{ scale: 1.1, color: "lime" }}
              className="text-2xl"
              onClick={() => document.getElementById(id)?.click()}
            >
              <PiCameraPlusLight />
            </motion.span>
            <input
              type="file"
              className="sr-only"
              id={id}
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const selectedFile = e.target?.files?.[0];
                if (selectedFile) {
                  setImage(selectedFile);
                  onChange(selectedFile);
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="image"
                width={2000}
                height={1000}
                className="object-cover"
              />
            )}
            {!image && placeholder.length != 0 && (
              <Image
                src={placeholder}
                alt="image"
                width={2000}
                height={1000}
                className="object-cover"
              />
            )}
          </div>
        </div>
        {valid && (
          <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">{error}</p>
        )}
      </div>
    );
  }
};

export default Input;
