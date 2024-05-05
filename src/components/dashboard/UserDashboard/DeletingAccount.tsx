import Image from "next/image";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { AnimatePresence, motion } from "framer-motion";
import deleteRestaurant from "@/services/deleteRestaurant";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import usePending from "@/hooks/usePending";
import { useTranslation } from "react-i18next";

const reasons = [
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

const DeletingAccount = () => {
  const session = useSession();
  const [t, i18n] = useTranslation("global");

  const inistialValues = {
    reason: "I need help creating my meals.",
  };

  const validationSchema = Yup.object({
    reason: Yup.string().required("Required."),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteRestaurant(session.data?.user.token!),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      signOut();
      localStorage.clear();
    },
  });

  usePending({ isPending, message: "Deleting your account..." });

  const submitHandler = (values: typeof inistialValues) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="grid md:grid-cols-2 gap-5 items-center h-full text-center"
    >
      <div
        data-aos="fade-right"
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#fe4f5a]">
          {t("dashboard.user.deleteAccount.title")}
        </h1>
        <p className="hidden md:block mt-3 text-gray-700 md:w-10/12">
          {t("dashboard.user.deleteAccount.p1")}
        </p>
        <p className="mt-3 text-gray-700 md:w-10/12">
          {t("dashboard.user.deleteAccount.p2")}
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="mt-4 w-10/12">
              <div className="mb-4 w-full">
                {reasons.map((e, index) => (
                  <div
                    className="flex gap-2 md:gap-3 mb-3 items-center"
                    key={index}
                    onClick={() => setFieldValue("reason", e)}
                  >
                    <span className="w-4 h-4 rounded-full border-2 shadow-sm flex items-center justify-center">
                      <AnimatePresence>
                        {e.en === values.reason && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-[#fe4f5a] w-2 h-2 rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <p className="text-gray-400 text-sm md:text-lg">
                      {i18n.language == "ar" ? e.ar : e.en}
                    </p>
                  </div>
                ))}
                {reasons.slice(0, 5).every((e) => e.en != values.reason) && (
                  <Input
                    type="text"
                    className="mt-5"
                    placeholder="Write your problem title"
                    id="TypeOfError"
                    value={values.reason}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    valid={touched.reason && errors.reason}
                    error={errors.reason}
                  />
                )}
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 px-3 font-medium rounded-full bg-[#fe4f5a] text-white duration-300 mx-auto"
              >
                <p className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white text-[#fe4f5a]">
                  <IoIosClose size={20} />
                </p>{" "}
                <span>{t("dashboard.user.deleteAccount.button")}</span>
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
          src="/usersettings/deleteAccount.png"
          alt="changeemail"
          width={2000}
          height={2000}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default DeletingAccount;
