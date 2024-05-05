import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Country, State } from "country-state-city";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import usePending from "@/hooks/usePending";
import updateStoreOwner from "@/services/updateStoreOwner";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { addChangedValuesToBody } from "@/utils/helpers";
import { useTranslation } from "react-i18next";

const ChangeUserInfo = async () => {
  const session = useSession();
  const [t, i18n] = useTranslation("global");

  const { isPending, mutate } = useMutation({
    mutationFn: (body: Record<string, string>) =>
      updateStoreOwner(body, session.data?.user.token!),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      signOut();
    },
  });

  const inistialValues = {
    firstName: session.data?.user.storeOwner.firstName || "",
    lastName: session.data?.user.storeOwner.lastName || "",
    country: session.data?.user.storeOwner.country || "",
    city: session.data?.user.storeOwner.city || "",
    phoneNumber: session.data?.user.storeOwner.phoneNumber || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required."),
    lastName: Yup.string().required("Required."),
    country: Yup.string().required("Required."),
    city: Yup.string().required("Required."),
    phoneNumber: Yup.string()
      .required("Required.")
      .matches(
        /^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/,
        "Invalid phone number format"
      ),
  });

  usePending({ isPending, message: "Changing your informaiton..." });

  const submitHandler = (values: typeof inistialValues) => {
    let body: Record<string, string> = {};

    addChangedValuesToBody(
      body,
      "firstName",
      values.firstName,
      session.data?.user.storeOwner.firstName
    );
    addChangedValuesToBody(
      body,
      "city",
      values.city,
      session.data?.user.storeOwner.city
    );
    addChangedValuesToBody(
      body,
      "country",
      values.country,
      session.data?.user.storeOwner.country
    );
    addChangedValuesToBody(
      body,
      "lastName",
      values.lastName,
      session.data?.user.storeOwner.lastName
    );
    addChangedValuesToBody(
      body,
      "phoneNumber",
      values.phoneNumber,
      session.data?.user.storeOwner.phoneNumber
    );

    mutate(body);
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="grid md:grid-cols-2 gap-5 items-center h-full text-center overflow-hidden"
    >
      <div data-aos="fade-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.user.changePassword.title")}
        </h1>
        <p className="mt-3 text-gray-700">{t("dashboard.user.userInfo.p")}</p>
        <Formik
          initialValues={inistialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="w-full grid md:grid-cols-2 gap-5 mb-3">
                <Input
                  type="text"
                  placeholder={t("dashboard.user.userInfo.inputs.1")}
                  id="firstName"
                  className="text-start"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.firstName && touched.firstName}
                  error={errors.firstName}
                />
                <Input
                  type="text"
                  placeholder={t("dashboard.user.userInfo.inputs.2")}
                  id="lastName"
                  className="text-start"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.lastName && touched.lastName}
                  error={errors.lastName}
                />
              </div>
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
                      {t("dashboard.user.userInfo.inputs.3")}
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
                      {t("dashboard.user.userInfo.inputs.4")}
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
              <Input
                id="phoneNumber"
                type="phonenumber"
                placeholder={t("dashboard.user.userInfo.inputs.5")}
                value={values.phoneNumber}
                onChange={(value) => setFieldValue("phoneNumber", value)}
                className="mb-4"
                onBlur={() => setFieldTouched("phoneNumber", true)}
                valid={errors.phoneNumber && touched.phoneNumber}
                error={errors.phoneNumber}
              />
              <button
                type="submit"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
              >
                <BsArrowRightCircleFill size={30} />{" "}
                <span>{t("dashboard.user.userInfo.button")}</span>
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
          src="/usersettings/updateuser.png"
          alt="changeemail"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeUserInfo;
