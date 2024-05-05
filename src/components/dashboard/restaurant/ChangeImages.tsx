"use client";

import Input from "@/components/Input/Input";
import Image from "next/image";
import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormValues } from "@/types/ImageForm";
import useChangeStore from "@/hooks/useChangeStore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MAX_FILE_SIZE: number = 5242880;

const validFileExtensions: { [key: string]: string[] } = {
  image: ["jpg", "png", "jpeg"],
};

function isValidFileType(fileName: string, fileType: string): boolean {
  if (fileName) {
    return (
      validFileExtensions[fileType].indexOf(fileName.split(".").pop() || "") >
      -1
    );
  }
  return false;
}

interface Props {
  errorMessage: string | null;
  store: {
    backgroundURL: string;
    logoURL: string;
  };
}

const ChangeImages: React.FC<Props> = ({ errorMessage, store }) => {
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [t, i18n] = useTranslation("global");
  const { mutate } = useChangeStore({ errorMessage });

  const initialValues: FormValues = {
    cover: null,
    logo: null,
  };

  const submitHandler = (values: FormValues) => {
    const formData = new FormData();

    if (values.cover)
      formData.append("backgroundFile", JSON.stringify(values.cover));

    if (values.logo) formData.append("logoFile", JSON.stringify(values.logo));

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
        <h1 className="text-xl md:text-3xl xl:text-4xl font-semibold text-green-600">
          {t("dashboard.restaurant.page1.title")}
        </h1>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          {t("dashboard.restaurant.page1.p")}
        </p>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {({ setFieldValue, handleBlur, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex-col md:flex-row flex gap-5 mb-5 items-center justify-center">
                <Input
                  type="image"
                  className="w-[180px] h-[180px]"
                  placeholder={
                    process.env.NEXT_PUBLIC_IMAGE_URL + store.logoURL
                  }
                  id="logo"
                  value=""
                  onChange={(b: any) => setFieldValue("logo", b)}
                  onBlur={handleBlur}
                  valid={errors.logo && touched.logo}
                  error={errors.logo}
                />
                <Input
                  type="image"
                  className="w-[180px] h-[180px] md:w-[450px] md:h-[180px]"
                  placeholder={
                    process.env.NEXT_PUBLIC_IMAGE_URL + store.backgroundURL
                  }
                  id="cover"
                  value=""
                  onChange={(b: any) => setFieldValue("cover", b)}
                  onBlur={handleBlur}
                  valid={errors.cover && touched.cover}
                  error={errors.cover}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
              >
                <BsArrowRightCircleFill size={30} />{" "}
                <span>{t("dashboard.restaurant.page1.button")}</span>
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div
        data-aos="fade-left"
        className="w-full h-full hidden lg:flex items-center justify-center"
      >
        <Image
          src="/restaurant/uploadimage.png"
          alt="worktime"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeImages;
