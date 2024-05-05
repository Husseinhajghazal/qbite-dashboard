"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Country, State } from "country-state-city";
import Image from "next/image";
import useChangeStore from "@/hooks/useChangeStore";
import { changeTextLanguage } from "@/utils/helpers";
import { TranslatedProp } from "@/types/Store";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import SelectInput from "@/components/Input/SelectInput";
import { languagesList } from "@/Data/languagesList";
import { useTranslation } from "react-i18next";

interface Props {
  errorMessage: string | null;
  store: {
    restaurantName: TranslatedProp;
    phoneNumber: string;
    country: string;
    city: string;
  };
}

const ChangeInforamtion: React.FC<Props> = ({ errorMessage, store }) => {
  const { mutate } = useChangeStore({ errorMessage });
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [t, i18n] = useTranslation("global");

  const initialValues = {
    restaurantName: store.restaurantName.fallback,
    phoneNumber: store.phoneNumber,
    country: store.country,
    city: store.city,
    language: languageState,
  };

  const validationSchema = Yup.object({
    restaurantName: Yup.string().required("Required."),
    country: Yup.string().required("Required."),
    city: Yup.string().required("Required."),
    phoneNumber: Yup.string()
      .required("Required.")
      .matches(
        /^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/,
        "Invalid phone number format"
      ),
  });

  const submitHandler = (values: typeof initialValues) => {
    const formData = new FormData();

    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("name", values.restaurantName);

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
    setFieldTouched,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: submitHandler,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    setFieldValue(
      "restaurantName",
      changeTextLanguage(
        store.restaurantName,
        values.language as "ar" | "en",
        store.restaurantName.fallback
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
          {t("dashboard.restaurant.page3.title")}
        </h1>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          {t("dashboard.restaurant.page3.p")}
        </p>
        <form onSubmit={handleSubmit} className="mt-5">
          <Input
            type="text"
            placeholder={t("dashboard.restaurant.page3.inputs.1")}
            id="restaurantName"
            className="text-start mb-3"
            value={values.restaurantName}
            onChange={handleChange}
            onBlur={handleBlur}
            valid={errors.restaurantName && touched.restaurantName}
            error={errors.restaurantName}
          />
          <div className="w-full grid md:grid-cols-2 gap-5 mb-3">
            <div className="">
              <select
                onChange={handleChange}
                id="country"
                onBlur={handleBlur}
                value={values.country}
                className={`border-2 w-full rounded-full py-2 px-4 outline-none duration-300 appearance-none hover:appearance-none ${
                  errors.country && touched.country
                    ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
                    : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
                }`}
              >
                <option value="">
                  {t("dashboard.restaurant.page3.inputs.2")}
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {errors.country && touched.country && (
                <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">
                  {errors.country}
                </p>
              )}
            </div>
            <div className="">
              <select
                onChange={handleChange}
                id="city"
                onBlur={handleBlur}
                value={values.city}
                className={`border-2 w-full rounded-full py-2 px-4 outline-none duration-300 appearance-none hover:appearance-none ${
                  errors.city && touched.city
                    ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
                    : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
                }`}
              >
                <option value="">
                  {t("dashboard.restaurant.page3.inputs.3")}
                </option>
                {State &&
                  State.getStatesOfCountry(values.country).map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {errors.city && touched.city && (
                <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">
                  {errors.city}
                </p>
              )}
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-5 mb-8">
            <Input
              id="phoneNumber"
              type="phonenumber"
              placeholder={t("dashboard.restaurant.page3.inputs.4")}
              value={values.phoneNumber}
              onChange={(value) => setFieldValue("phoneNumber", value)}
              className=""
              onBlur={() => setFieldTouched("phoneNumber", true)}
              valid={errors.phoneNumber && touched.phoneNumber}
              error={errors.phoneNumber}
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
            <span>{t("dashboard.restaurant.page3.button")}</span>
          </button>
        </form>
      </div>
      <div
        data-aos="fade-left"
        className="w-full h-full hidden lg:flex items-center justify-center"
      >
        <Image
          src="/restaurant/information.png"
          alt="worktime"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeInforamtion;
