import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import changePassword from "@/services/changePassword";
import usePending from "@/hooks/usePending";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const session = useSession();
  const [t, i18n] = useTranslation("global");

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      newPassword,
      password,
    }: {
      newPassword: string;
      password: string;
    }) => changePassword(newPassword, password, session.data?.user.token!),
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

  const inistialValues = {
    email: session.data?.user.storeOwner.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    oldPassword: Yup.string().required("Required."),
    newPassword: Yup.string()
      .required("Required.")
      .min(8, "Min length of the password should be 8.")
      .max(16, "Max length of the password should be 16.")
      .matches(
        /(?=.*?[A-Z])/g,
        "Password should contain at least 1 big letter."
      )
      .matches(
        /(?=.*?[a-z])/g,
        "Password should contain at least 1 small letter."
      )
      .matches(/(?=.*?[0-9])/g, "Password should contain at least 1 number."),
    confirmPassword: Yup.string()
      .required("Required.")
      .oneOf([Yup.ref("newPassword")], "Passwords must match."),
  });

  usePending({ isPending, message: "Changing your password..." });

  const submitHandler = (values: typeof inistialValues) => {
    mutate({ newPassword: values.newPassword, password: values.oldPassword });
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="grid md:grid-cols-2 gap-5 items-center h-full text-center"
    >
      <div data-aos="fade-right">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-green-600">
          {t("dashboard.user.changePassword.title")}
        </h1>
        <p className="mt-3 text-gray-700">
          {t("dashboard.user.changePassword.p")}
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
                  type="password"
                  placeholder={t("dashboard.user.changeEmail.inputs.2")}
                  id="oldPassword"
                  className="text-start"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.oldPassword && touched.oldPassword}
                  error={errors.oldPassword}
                />
              </div>
              <div className="w-full grid md:grid-cols-2 gap-5 mb-8">
                <Input
                  type="email"
                  placeholder={t("dashboard.user.changeEmail.inputs.3")}
                  id="newPassword"
                  className="text-start"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={errors.newPassword && touched.newPassword}
                  error={errors.newPassword}
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
          src="/usersettings/resetpassword.png"
          alt="changeemail"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
