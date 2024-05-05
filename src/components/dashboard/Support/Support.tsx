"use client";

import Input from "@/components/Input/Input";
import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FieldArray, Formik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import { supportForm } from "@/types/support";
import { LuImagePlus } from "react-icons/lu";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import supportTicket from "@/services/supportTicket";
import { signOut, useSession } from "next-auth/react";
import usePending from "@/hooks/usePending";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const supportTitles = [
  {
    en: "I need help creating my meals.",
    ar: "أحتاج إلى مساعدة في إعداد وجباتي.",
  },
  { en: "I can't edit my meals.", ar: "لا أستطيع تعديل وجباتي." },
  { en: "I can't delete my meals.", ar: "لا أستطيع حذف وجباتي." },
  { en: "I'm Facing problems in categories.", ar: "أواجه مشاكل في الأصناف." },
  {
    en: "My data not loading in my dashboard.",
    ar: "لا يتم تحميل بياناتي في لوحة التحكم الخاصة بي.",
  },
  { en: "Other issues", ar: "مشاكل أخرى" },
];

const Support = () => {
  const { data: session } = useSession();
  const [t, i18n] = useTranslation("global");
  const firstName = session?.user.storeOwner.firstName || "Restaurant";
  const lastName = session?.user.storeOwner.lastName || "Owner";

  const initialValues: supportForm = {
    TypeOfError: "I need help creating my meals.",
    email: session?.user.storeOwner.email || "",
    username: firstName + " " + lastName,
    description: "",
    images: [null],
  };

  const validationSchema = Yup.object({
    TypeOfError: Yup.string().required("Required."),
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    username: Yup.string().required("Required."),
    description: Yup.string().required("Required."),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (body: Record<string, any>) =>
      supportTicket(
        session?.user.token!,
        session?.user.storeOwner.stores[0].id.toString()!,
        body
      ),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => toast.success(data.data.message),
  });

  usePending({ isPending, message: "Sending your message to support..." });

  const submitHandler = (values: supportForm) => {
    let body: Record<string, any> = {};

    body.subject = values.TypeOfError;
    body.description = values.description;
    body.images = values.images.slice(0, values.images.length - 1);

    mutate(body);
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={`${
        i18n.language == "ar" ? "pr-[94px] pl-[26px]" : "pl-[94px] pr-[26px]"
      } pt-8 bg-white h-screen pb-2 lg:pb-4 text-center`}
    >
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        {t("dashboard.support.title1")}{" "}
        <span className="text-green-600">{t("dashboard.support.title2")}</span>
      </h1>
      <p className="text-gray-500">{t("dashboard.support.p")}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{ boxShadow: "0 0 6px -1px #00000061" }}
              className="p-5 md:p-8 my-8 grid md:grid-cols-2 gap-5 md:gap-10 rounded-xl text-start"
            >
              <div>
                <Input
                  type="text"
                  className="mb-5"
                  placeholder={t("dashboard.support.input1")}
                  id="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  valid={touched.username && errors.username}
                  error={errors.username}
                />
                <Input
                  type="text"
                  className="mb-5"
                  placeholder={t("dashboard.support.input2")}
                  id="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  valid={touched.email && errors.email}
                  error={errors.email}
                />
                <Input
                  type="textarea"
                  className="mb-8"
                  placeholder={t("dashboard.support.input3")}
                  id="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  valid={touched.description && errors.description}
                  error={errors.description}
                />
                <FieldArray
                  name="images"
                  render={({ push, remove }) => (
                    <div className="flex flex-wrap gap-2">
                      {values.images.map((image, index) => (
                        <div key={index}>
                          {image ? (
                            <div className="relative w-[100px] h-[100px] rounded-lg border-2 shadow-sm flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute -top-2 -right-2 text-rose-600 duration-300 hover:text-rose-800 hover:scale-125"
                              >
                                <TiDelete />
                              </button>
                              <Image
                                alt="food"
                                src={URL.createObjectURL(image)}
                                width={500}
                                height={500}
                                className="object-fit"
                              />
                            </div>
                          ) : (
                            <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                              <input
                                type="file"
                                className="sr-only"
                                id={`images[${index}]`}
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const selectedFile = e.target?.files?.[0];
                                  if (selectedFile) {
                                    setFieldValue(
                                      `images[${index}]`,
                                      selectedFile
                                    );
                                    push(null);
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById(`images[${index}]`)
                                    ?.click()
                                }
                              >
                                <LuImagePlus size={40} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
              <div>
                {supportTitles.map((e, index) => (
                  <div
                    className="flex gap-2 md:gap-3 mb-3 items-center"
                    key={index}
                    onClick={() => setFieldValue("TypeOfError", e.en)}
                  >
                    <span className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 shadow-sm flex items-center justify-center">
                      <AnimatePresence>
                        {e.en === values.TypeOfError && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-green-600 w-2 h-2 md:w-4 md:h-4 rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <p className="text-gray-400 text-sm md:text-lg">
                      {i18n.language == "ar" ? e.ar : e.en}
                    </p>
                  </div>
                ))}
                {supportTitles
                  .slice(0, 5)
                  .every((e) => e.en != values.TypeOfError) && (
                  <Input
                    type="text"
                    className="mt-5"
                    placeholder="Write your problem title"
                    id="TypeOfError"
                    value={values.TypeOfError}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    valid={touched.TypeOfError && errors.TypeOfError}
                    error={errors.TypeOfError}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 mx-auto font-medium rounded-full bg-[#2f834f] text-white duration-300"
            >
              <BsArrowRightCircleFill size={30} />{" "}
              <span>{t("dashboard.support.button")}</span>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Support;
