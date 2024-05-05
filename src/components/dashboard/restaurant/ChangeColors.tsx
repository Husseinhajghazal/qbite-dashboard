"use client";

import React, { useState } from "react";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import useChangeStore from "@/hooks/useChangeStore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface Props {
  errorMessage: string | null;
  store: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
  };
}

const ChangeColors: React.FC<Props> = ({ errorMessage, store }) => {
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const { mutate } = useChangeStore({ errorMessage });
  const [t, i18n] = useTranslation("global");

  const [primaryColor, setPrimaryColor] = useState(store.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(store.secondaryColor);
  const [thirdColor, setThirdColor] = useState(store.backgroundColor);

  const submitHandler = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("primaryColor", primaryColor);
    formData.append("secondaryColor", secondaryColor);
    formData.append("backgroundColor", thirdColor);

    mutate({ formData, language: languageState });
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] h-screen pb-2 lg:pb-4 grid lg:grid-cols-2 gap-5 items-center text-center`}
    >
      <div data-aos="fade-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.restaurant.page4.title")}
        </h1>
        <p className="mt-3 text-gray-700">
          {t("dashboard.restaurant.page4.p")}
        </p>
        <form onSubmit={submitHandler} className="mt-5">
          <div className="mb-6 flex flex-row gap-5 justify-center">
            <Input
              type="color"
              className=""
              placeholder={t("dashboard.restaurant.page4.inputs.1")}
              value={primaryColor}
              onBlur={() => {}}
              onChange={(e) => {
                setPrimaryColor(e.target.value);
              }}
              id="mainColor"
              valid={true}
              error=""
            />
            <Input
              type="color"
              className=""
              placeholder={t("dashboard.restaurant.page4.inputs.2")}
              value={secondaryColor}
              onBlur={() => {}}
              onChange={(e) => {
                setSecondaryColor(e.target.value);
              }}
              id="mainColor"
              valid={true}
              error=""
            />
            <Input
              type="color"
              className=""
              placeholder={t("dashboard.restaurant.page4.inputs.3")}
              value={thirdColor}
              onBlur={() => {}}
              onChange={(e) => {
                setThirdColor(e.target.value);
              }}
              id="mainColor"
              valid={true}
              error=""
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
          >
            <BsArrowRightCircleFill size={30} />{" "}
            <span>{t("dashboard.restaurant.page4.button")}</span>
          </button>
        </form>
      </div>
      <div
        data-aos="fade-left"
        className="w-full h-full hidden lg:flex items-center justify-center"
      >
        <Image
          src="/restaurant/theme.png"
          alt="worktime"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeColors;
