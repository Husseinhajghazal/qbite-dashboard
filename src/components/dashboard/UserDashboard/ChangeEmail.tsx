import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import changeEmail from "@/services/changeEmail";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import usePending from "@/hooks/usePending";
import { useTranslation } from "react-i18next";

const ChangeEmail = () => {
  const session = useSession();
  const [t, i18n] = useTranslation("global");

  const inistialValues = {
    email: session.data?.user.storeOwner.email || "",
    newEmail: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    newEmail: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email.")
      .notOneOf([Yup.ref("email")], "Old emial can't be the new one."),
    password: Yup.string().required("Required."),
    confirmPassword: Yup.string()
      .required("Required.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (email: string) =>
      changeEmail(email, session?.data?.user?.token!),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      session.update();
    },
  });

  usePending({ isPending, message: "Changing your Email..." });

  const submitHandler = (values: any) => {
    mutate(values.email);
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="grid md:grid-cols-2 gap-5 items-center h-full text-center"
    >
      <div data-aos="fade-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.user.changeEmail.title")}
        </h1>
        <p className="mt-3 text-gray-700">
          {t("dashboard.user.changeEmail.p")}
        </p>
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
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="mt-8 px-6">
              <div className="w-full grid md:grid-cols-2 gap-5 mb-3">
                <Input
                  type="email"
                  placeholder={t("dashboard.user.changeEmail.inputs.1")}
                  id="email"
                  className="text-start"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.email && touched.email}
                  error={errors.email}
                />
                <Input
                  type="email"
                  placeholder={t("dashboard.user.changeEmail.inputs.2")}
                  id="newEmail"
                  className="text-start"
                  value={values.newEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.newEmail && touched.newEmail}
                  error={errors.newEmail}
                />
              </div>
              <div className="w-full grid md:grid-cols-2 gap-5 mb-8">
                <Input
                  type="password"
                  placeholder={t("dashboard.user.changeEmail.inputs.3")}
                  id="password"
                  className="text-start"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.password && touched.password}
                  error={errors.password}
                />
                <Input
                  type="password"
                  placeholder={t("dashboard.user.changeEmail.inputs.4")}
                  id="confirmPassword"
                  className="text-start"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.confirmPassword && touched.confirmPassword}
                  error={errors.confirmPassword}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
              >
                <BsArrowRightCircleFill size={30} />{" "}
                <span>{t("dashboard.user.changeEmail.button")}</span>
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
          src="/usersettings/changeaccount.png"
          alt="changeemail"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangeEmail;
