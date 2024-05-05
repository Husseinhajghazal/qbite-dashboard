"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import type { TranslatedProp } from "@/types/Store";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { changeTextLanguage } from "@/utils/helpers";
import useChangeStore from "@/hooks/useChangeStore";
import SelectInput from "@/components/Input/SelectInput";
import { languagesList } from "@/Data/languagesList";
import { useTranslation } from "react-i18next";

interface Props {
  errorMessage: string | null;
  store: {
    username: string;
    description: TranslatedProp;
    slogan: TranslatedProp | null;
  };
}

const ChangeSeo: React.FC<Props> = ({ errorMessage, store }) => {
  const { mutate } = useChangeStore({ errorMessage });
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [t, i18n] = useTranslation("global");

  const initialValues = {
    username: store.username,
    description: store.description.fallback,
    slogan: store.slogan ? store.slogan.fallback : "",
    language: languageState,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required."),
    description: Yup.string().required("Required."),
  });

  const submitHandler = (values: typeof initialValues) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("description", values.description);
    formData.append("slogan", values.slogan);

    mutate({ formData, language: values.language });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: submitHandler,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    setFieldValue(
      "description",
      changeTextLanguage(
        store.description,
        values.language as "en" | "ar",
        store.description.fallback
      )
    );
    setFieldValue(
      "slogan",
      changeTextLanguage(
        store.slogan != null ? store.slogan : null,
        values.language as "en" | "ar",
        store.slogan != null ? store.slogan.fallback : ""
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.language]);

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] h-screen pb-2 lg:pb-4 grid lg:grid-cols-2 gap-5 items-center text-center`}
    >
      <div data-aos="fade-right">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.restaurant.page5.title")}
        </h1>
        <p className="mt-3 text-gray-700 text-ms md:text-base">
          {t("dashboard.restaurant.page5.p")}
        </p>
        <form onSubmit={handleSubmit} className="mt-5">
          <Input
            className="mb-3"
            placeholder={t("dashboard.restaurant.page5.inputs.1")}
            type="text"
            id="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            valid={errors.username && touched.username}
            error={errors.username}
          />
          <Input
            className="mb-3"
            placeholder={t("dashboard.restaurant.page5.inputs.2")}
            type="textarea"
            id="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            valid={errors.description && touched.description}
            error={errors.description}
          />
          <div className="w-full grid md:grid-cols-2 gap-5 mb-5">
            <Input
              className=""
              placeholder={t("dashboard.restaurant.page5.inputs.3")}
              type="text"
              id="slogan"
              value={values.slogan}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.slogan && touched.slogan}
              error={errors.slogan}
            />
            <SelectInput
              className=""
              placeholder="Choose Language"
              id="language"
              value={values.language}
              onBlur={handleBlur}
              onChange={handleChange}
              valid={touched.language && errors.language}
              error={errors.language}
              array={languagesList}
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
          >
            <BsArrowRightCircleFill size={30} />{" "}
            <span>{t("dashboard.restaurant.page5.button")}</span>
          </button>
        </form>
      </div>
      <div
        data-aos="fade-left"
        className="w-full h-full hidden lg:flex items-center justify-center"
      >
        <Image
          src="/restaurant/description.png"
          alt="worktime"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeSeo;
