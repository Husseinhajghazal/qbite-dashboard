"use client";

import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import { toast } from "react-toastify";
import useChangeStore from "@/hooks/useChangeStore";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

interface Props {
  errorMessage: string | null;
  store: { openingHours: string; closingHours: string };
}

const ChangeWorkTimes: React.FC<Props> = ({ errorMessage, store }) => {
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [t, i18n] = useTranslation("global");
  const { mutate } = useChangeStore({ errorMessage });

  const initialValues = {
    startTime: store.openingHours,
    endTime: store.closingHours,
  };

  const validationSchema = Yup.object({
    startTime: Yup.string().required("Required."),
    endTime: Yup.string().required("Required."),
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const submitHandler = (values: typeof initialValues) => {
    const formData = new FormData();

    formData.append("openingHours", values.startTime);
    formData.append("closingHours", values.endTime);

    mutate({ formData, language: languageState });
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] h-screen pb-2 lg:pb-4 grid md:grid-cols-2 gap-5 items-center text-center`}
    >
      <div data-aos="fade-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.restaurant.page2.title")}
        </h1>
        <p className="mt-3 text-gray-700">
          {t("dashboard.restaurant.page2.p")}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="w-full grid md:grid-cols-2 gap-5 mb-3">
                <Input
                  type="time"
                  placeholder={t("dashboard.restaurant.page2.input1")}
                  id="startTime"
                  className=""
                  value={values.startTime}
                  onChange={(e) => setFieldValue("startTime", e)}
                  onBlur={handleBlur}
                  valid={errors.startTime && touched.startTime}
                  error={errors.startTime}
                />
                <Input
                  type="time"
                  placeholder={t("dashboard.restaurant.page2.input2")}
                  id="endTime"
                  className=""
                  value={values.endTime}
                  onChange={(e) => setFieldValue("endTime", e)}
                  onBlur={handleBlur}
                  valid={errors.endTime && touched.endTime}
                  error={errors.endTime}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
              >
                <BsArrowRightCircleFill size={30} />{" "}
                <span>{t("dashboard.restaurant.page2.button")}</span>
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div
        data-aos="fade-left"
        className="w-full h-full hidden md:flex items-center justify-center"
      >
        <Image
          src="/restaurant/worktime.png"
          alt="worktime"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeWorkTimes;
