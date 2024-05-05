"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ColorType, QrForm } from "@/types/QrForm";
import { BsQrCodeScan } from "react-icons/bs";
import { MdOutlineRoundedCorner } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import { LuImagePlus } from "react-icons/lu";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createQr } from "@/utils/createQr";
import { BiSolidSave } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import saveQr from "@/services/saveQr";
import usePending from "@/hooks/usePending";
import { FaCloudDownloadAlt } from "react-icons/fa";
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  GradientType,
} from "qr-code-styling";
import editQr from "@/services/editQr";
import { useTranslation } from "react-i18next";

const qrEditBar = [
  {
    icon: <LuImagePlus />,
    id: 0,
  },
  {
    icon: <TbGridDots />,
    id: 1,
  },
  {
    icon: <MdOutlineRoundedCorner />,
    id: 2,
  },
  {
    icon: <BsQrCodeScan />,
    id: 3,
  },
  {
    icon: <PiSelectionBackgroundDuotone />,
    id: 4,
  },
];

const dotsStyles = [
  {
    image: "/dots/square.png",
    name: "square",
  },
  { image: "/dots/rounded.png", name: "rounded" },
  { image: "/dots/extra-rounded.png", name: "extra-rounded" },
  { image: "/dots/dots.png", name: "dots" },
  { image: "/dots/classy.png", name: "classy" },
  { image: "/dots/classy-rounded.png", name: "classy-rounded" },
];

const cornersDotStyles = [
  { image: "/corners-dot/square.png", name: "square" },
  {
    image: "/corners-dot/dot.png",
    name: "dot",
  },
];

const cornersSquaresStyles = [
  { image: "/corners-squares/square.png", name: "square" },
  {
    image: "/corners-squares/dot.png",
    name: "dot",
  },
  {
    image: "/corners-squares/extra-rounded.png",
    name: "extra-rounded",
  },
];

const QrCustomize = ({
  qrCode,
  username,
  logoUrl,
}: {
  qrCode: QrForm | null;
  username: string;
  logoUrl: string;
}) => {
  const [stage, setStage] = useState(0);
  const [t, i18n] = useTranslation("global");

  const initialValues: QrForm = {
    size: qrCode?.size || 1000,
    hasLogo: qrCode?.hasLogo || false,
    dotsStyle:
      (qrCode?.dotsStyle.toLowerCase().replace("_", "-") as DotType) ||
      "square",
    dotsColorType: qrCode?.dotsColorType || "SINGLE_COLOR",
    dotsGradientType:
      (qrCode?.dotsGradientType
        .toLowerCase()
        .replace("_", "-") as GradientType) || "linear",
    dotsColor1: qrCode?.dotsColor1 || "#000000",
    dotsColor2: qrCode?.dotsColor2 || "#ffffff",
    cornersSquaresStyle:
      (qrCode?.cornersSquaresStyle
        .toLowerCase()
        .replace("_", "-") as CornerSquareType) || "square",
    cornersSquaresColorType: qrCode?.cornersSquaresColorType || "SINGLE_COLOR",
    cornersSquaresGradientType:
      (qrCode?.cornersSquaresGradientType
        .toLowerCase()
        .replace("_", "-") as GradientType) || "linear",
    cornersSquaresColor1: qrCode?.cornersSquaresColor1 || "#000000",
    cornersSquaresColor2: qrCode?.cornersSquaresColor2 || "#ffffff",
    cornersDotsStyle:
      (qrCode?.cornersDotsStyle
        .toLowerCase()
        .replace("_", "-") as CornerDotType) || "square",
    cornersDotsColorType: qrCode?.cornersDotsColorType || "SINGLE_COLOR",
    cornersDotsGradientType:
      (qrCode?.cornersDotsGradientType
        .toLowerCase()
        .replace("_", "-") as GradientType) || "linear",
    cornersDotsColor1: qrCode?.cornersDotsColor1 || "#000000",
    cornersDotsColor2: qrCode?.cornersDotsColor2 || "#ffffff",
    backgroundColorType: qrCode?.backgroundColorType || "SINGLE_COLOR",
    backgroundGradientType:
      (qrCode?.backgroundGradientType
        .toLowerCase()
        .replace("_", "-") as GradientType) || "linear",
    backgroundColor1: qrCode?.backgroundColor1 || "#ffffff",
    backgroundColor2: qrCode?.backgroundColor2 || "#ffffff",
  };

  const validationSchema = Yup.object({
    dotsStyle: Yup.string().required("Choose the dot style"),
    dotsColorType: Yup.string().required("Choose the dots color type"),
    dotsColor1: Yup.string().required("Choose the dots Color"),
    cornersSquaresStyle: Yup.string().required(
      "Choose the corners squares style"
    ),
    cornersSquaresColorType: Yup.string().required(
      "Choose the corners squares color type"
    ),
    cornersSquaresColor1: Yup.string().required(
      "Choose the corner squares color"
    ),
    cornersDotsStyle: Yup.string().required("Choose the corners dots style"),
    cornersDotsColorType: Yup.string().required(
      "Choose the corners dots color type"
    ),
    cornersDotsColor1: Yup.string().required("Choose the corners dots color"),
    backgroundColorType: Yup.string().required(
      "Choose the background color type"
    ),
    backgroundColor1: Yup.string().required("Choose the background color"),
  });

  const session = useSession();

  const { isPending, mutate } = useMutation({
    mutationFn: (body: Record<string, any>) => {
      if (qrCode) {
        return editQr(body, qrCode.id!, session.data?.user.token!);
      } else {
        return saveQr(
          body,
          session.data?.user.storeOwner.stores[0].id!,
          session.data?.user.token!
        );
      }
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
  });

  usePending({ isPending, message: "Saving your Qr code..." });

  const SaveQr = (values: QrForm) => {
    const logoLink: string = process.env.NEXT_PUBLIC_IMAGE_URL + logoUrl;

    createQr({
      values,
      logoLink,
      width: 1000,
      height: 1000,
      username,
      download: true,
    });

    values = {
      ...values,
      dotsStyle: values.dotsStyle.toUpperCase().replace("-", "_") as DotType,
      dotsGradientType: values.dotsGradientType
        .toUpperCase()
        .replace("-", "_") as GradientType,
      cornersSquaresStyle: values.cornersSquaresStyle
        .toUpperCase()
        .replace("-", "_") as CornerSquareType,
      cornersSquaresGradientType: values.cornersSquaresGradientType
        .toUpperCase()
        .replace("-", "_") as GradientType,
      cornersDotsStyle: values.cornersDotsStyle
        .toUpperCase()
        .replace("-", "_") as CornerDotType,
      cornersDotsGradientType: values.cornersDotsGradientType
        .toUpperCase()
        .replace("-", "_") as GradientType,
      backgroundGradientType: values.backgroundGradientType
        .toUpperCase()
        .replace("-", "_") as GradientType,
    };

    mutate(values);
  };

  const DownloadQr = () => {
    const logoLink: string = process.env.NEXT_PUBLIC_IMAGE_URL + logoUrl;

    createQr({
      values,
      logoLink,
      width: 1000,
      height: 1000,
      username,
      download: true,
    });
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: SaveQr,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    const logoLink: string = process.env.NEXT_PUBLIC_IMAGE_URL + logoUrl;

    createQr({
      values,
      logoLink,
      width: 280,
      height: 280,
      username,
      download: false,
    });
  }, [logoUrl, username, values]);

  return (
    <div
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] min-h-screen pb-2 lg:pb-4`}
    >
      <form
        data-aos="fade-right"
        onSubmit={handleSubmit}
        className="flex flex-col items-center min-h-[90vh]"
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="bg-[#2f834f] rounded-md flex md:block">
            {qrEditBar.map((e) => (
              <div
                key={e.id}
                className={`p-3 rounded-[4px] transition-all duration-300 md:text-[25px] ${
                  stage == e.id ? "bg-white" : "text-white"
                }`}
                onClick={() => setStage(e.id)}
              >
                {e.icon}
              </div>
            ))}
          </div>
          <div
            id="canvas"
            className={`bg-white w-[280px] h-[280px] md:h-[350px] md:w-[350px] rounded-lg shadow-md overflow-hidden flex items-center justify-center`}
          ></div>
        </div>
        <div className="my-4 flex-1">
          {stage == 4 && (
            <div
              data-aos="fade-right"
              className="flex flex-col items-center gap-5"
            >
              <div className="flex gap-3">
                <p
                  className={`${
                    "SINGLE_COLOR" == values.backgroundColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("backgroundColorType", "SINGLE_COLOR")
                  }
                >
                  {t("dashboard.QBite.controllers.1")}
                </p>
                <p
                  className={`${
                    "GRADIENT" == values.backgroundColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("backgroundColorType", "GRADIENT")
                  }
                >
                  {t("dashboard.QBite.controllers.2")}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {values.backgroundColorType == "SINGLE_COLOR" ? (
                  <input
                    type="color"
                    id="backgroundColor1"
                    value={values.backgroundColor1}
                    onChange={handleChange}
                  />
                ) : (
                  <React.Fragment>
                    <input
                      type="color"
                      id="backgroundColor1"
                      value={values.backgroundColor1}
                      onChange={handleChange}
                    />
                    <input
                      type="color"
                      id="backgroundColor2"
                      value={values.backgroundColor2}
                      onChange={handleChange}
                    />
                    <select
                      id="backgroundGradientType"
                      onChange={handleChange}
                      className="w-24 p-1 bg-green-200 outline-none"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
          {stage == 3 && (
            <div
              className={`flex flex-col gap-5 items-center`}
              data-aos="fade-right"
            >
              <div className="flex gap-2 max-w-full flex-wrap justify-center">
                {cornersSquaresStyles.map((e, index) => (
                  <div
                    className={`bg-white p-3 rounded-lg border-2 w-[75px] h-[75px] transition-all duration-300 ${
                      values.cornersSquaresStyle == e.name && "border-[#2f834f]"
                    }`}
                    key={index}
                    onClick={() => setFieldValue("cornersSquaresStyle", e.name)}
                  >
                    <Image
                      src={e.image}
                      alt=""
                      width={100}
                      height={100}
                      className="object-fit"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <p
                  className={`${
                    "SINGLE_COLOR" == values.cornersSquaresColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("cornersSquaresColorType", "SINGLE_COLOR")
                  }
                >
                  {t("dashboard.QBite.controllers.1")}
                </p>
                <p
                  className={`${
                    "GRADIENT" == values.cornersSquaresColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("cornersSquaresColorType", "GRADIENT")
                  }
                >
                  {t("dashboard.QBite.controllers.2")}
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                {values.cornersSquaresColorType == "SINGLE_COLOR" ? (
                  <input
                    type="color"
                    id="cornersSquaresColor1"
                    value={values.cornersSquaresColor1}
                    onChange={handleChange}
                  />
                ) : (
                  <React.Fragment>
                    <input
                      type="color"
                      id="cornersSquaresColor1"
                      value={values.cornersSquaresColor1}
                      onChange={handleChange}
                    />
                    <input
                      type="color"
                      id="cornersSquaresColor2"
                      value={values.cornersSquaresColor2}
                      onChange={handleChange}
                    />
                    <select
                      id="cornersSquaresGradientType"
                      onChange={handleChange}
                      className="w-24 p-1 bg-green-200 outline-none"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
          {stage == 2 && (
            <div
              className={`flex flex-col gap-5 items-center`}
              data-aos="fade-right"
            >
              <div className="flex gap-2 max-w-full flex-wrap justify-center">
                {cornersDotStyles.map((e, index) => (
                  <div
                    className={`bg-white p-3 rounded-lg border-2 w-[75px] h-[75px] transition-all duration-300 ${
                      values.cornersDotsStyle == e.name && "border-[#2f834f]"
                    }`}
                    key={index}
                    onClick={() => setFieldValue("cornersDotsStyle", e.name)}
                  >
                    <Image
                      src={e.image}
                      alt=""
                      width={100}
                      height={100}
                      className="object-fit"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <p
                  className={`${
                    "SINGLE_COLOR" == values.cornersDotsColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("cornersDotsColorType", "SINGLE_COLOR")
                  }
                >
                  {t("dashboard.QBite.controllers.1")}
                </p>
                <p
                  className={`${
                    "GRADIENT" == values.cornersDotsColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() =>
                    setFieldValue("cornersDotsColorType", "GRADIENT")
                  }
                >
                  {t("dashboard.QBite.controllers.2")}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {values.cornersDotsColorType == "SINGLE_COLOR" ? (
                  <input
                    type="color"
                    id="cornersDotsColor1"
                    value={values.cornersDotsColor1}
                    onChange={handleChange}
                  />
                ) : (
                  <React.Fragment>
                    <input
                      type="color"
                      id="cornersDotsColor1"
                      value={values.cornersDotsColor1}
                      onChange={handleChange}
                    />
                    <input
                      type="color"
                      id="cornersDotsColor2"
                      value={values.cornersDotsColor2}
                      onChange={handleChange}
                    />
                    <select
                      id="cornersDotsGradientType"
                      onChange={handleChange}
                      className="w-24 p-1 bg-green-200 outline-none"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
          {stage == 1 && (
            <div
              className={`flex flex-col gap-5 items-center`}
              data-aos="fade-right"
            >
              <div className="flex gap-2 max-w-full flex-wrap justify-center">
                {dotsStyles.map((e, index) => (
                  <div
                    className={`bg-white p-3 rounded-lg border-2 w-[75px] h-[75px] transition-all duration-300 ${
                      values.dotsStyle == e.name && "border-[#2f834f]"
                    }`}
                    key={index}
                    onClick={() => setFieldValue("dotsStyle", e.name)}
                  >
                    <Image
                      src={e.image}
                      alt=""
                      width={100}
                      height={100}
                      className="object-fit"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <p
                  className={`${
                    "SINGLE_COLOR" == values.dotsColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() => setFieldValue("dotsColorType", "SINGLE_COLOR")}
                >
                  {t("dashboard.QBite.controllers.1")}
                </p>
                <p
                  className={`${
                    "GRADIENT" == values.dotsColorType
                      ? "bg-[#2f834f] text-white shadow-lg"
                      : "bg-green-200"
                  } transition-all duration-300 py-2 px-3 rounded-md`}
                  onClick={() => setFieldValue("dotsColorType", "GRADIENT")}
                >
                  {t("dashboard.QBite.controllers.2")}
                </p>
              </div>
              <div className="flex gap-4 justify-center items-center">
                {values.dotsColorType == "SINGLE_COLOR" ? (
                  <input
                    type="color"
                    id="dotsColor1"
                    value={values.dotsColor1}
                    onChange={handleChange}
                  />
                ) : (
                  <React.Fragment>
                    <input
                      type="color"
                      id="dotsColor1"
                      value={values.dotsColor1}
                      onChange={handleChange}
                    />
                    <input
                      type="color"
                      id="dotsColor2"
                      value={values.dotsColor2}
                      onChange={handleChange}
                    />
                    <select
                      id="dotsGradientType"
                      onChange={handleChange}
                      className="w-24 p-1 bg-green-200 outline-none"
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                    </select>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
          {stage == 0 && (
            <div
              data-aos="fade-right"
              className="flex bg-white gap-4 rounded-xl font-semibold shadow-md cursor-pointer"
            >
              <p
                className={`p-4 rounded-xl transition-colors ${
                  values.hasLogo && "bg-[#2f834f] text-white"
                }`}
                onClick={() => setFieldValue("hasLogo", true)}
              >
                {t("dashboard.QBite.logo.1")}
              </p>
              <p
                className={`p-4 rounded-xl transition-colors ${
                  !values.hasLogo && "bg-[#2f834f] text-white"
                }`}
                onClick={() => setFieldValue("hasLogo", false)}
              >
                {t("dashboard.QBite.logo.2")}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#2f834f] text-white p-2 px-4 mx-auto font-medium rounded-full hover:bg-gray-100 hover:text-black duration-300"
          >
            <BiSolidSave size={20} /> <span>{t("dashboard.QBite.save")}</span>
          </button>
          <button
            type="button"
            onClick={DownloadQr}
            className="flex items-center gap-2 bg-transparent border-2 border-[#2f834f] text-[#2f834f] p-2 px-4 mx-auto font-medium rounded-full hover:bg-[#2f834f] hover:text-white duration-300"
          >
            <FaCloudDownloadAlt size={20} />{" "}
            <span>{t("dashboard.QBite.download")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QrCustomize;
