import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Input from "@/components/Input/Input";
import Button from "../../Buttons/Button";
import { FormValues } from "@/types/ConfirmationForm";
import { useMutation } from "@tanstack/react-query";
import confirmingAccount from "@/services/confirmingAccount";
import { toast } from "react-toastify";
import usePending from "@/hooks/usePending";
import { signOut } from "next-auth/react";

const ConfirmationForm = ({ nextStep }: { nextStep: () => void }) => {
  const initialValues: FormValues = {
    email: "",
    password: "",
    signupCode: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Required.")
      .email("Plese enter a valid email."),
    signupCode: Yup.string()
      .required("Required.")
      .matches(/^\d{4}$/, "must be 4 digits."),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      email,
      password,
      signupCode,
    }: {
      email: string;
      password: string;
      signupCode: string;
    }) => confirmingAccount(email, password, signupCode),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      localStorage.setItem("token", data.data.data.token);
      setTimeout(() => {
        nextStep();
      }, 2000);
    },
  });

  usePending({ isPending, message: "Confirming your Account" });

  const handleSubmit = (values: FormValues) => {
    mutate({
      email: values.email,
      password: values.password,
      signupCode: values.signupCode,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <motion.form
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 50,
          }}
          onSubmit={handleSubmit}
          className="max-w-[300px] md:max-w-[500px] mx-auto"
        >
          <div>
            <Input
              id="email"
              type="email"
              className="mb-5"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.email && touched.email}
              error={errors.email}
              placeholder="email"
            />
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className=""
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                valid={errors.password && touched.password}
                error={errors.password}
              />
              <Input
                id="signupCode"
                placeholder="Confirmation Code"
                type="text"
                className=""
                value={values.signupCode}
                onChange={handleChange}
                onBlur={handleBlur}
                valid={errors.signupCode && touched.signupCode}
                error={errors.signupCode}
              />
            </div>
          </div>
          <Button onClick={() => {}} />
        </motion.form>
      )}
    </Formik>
  );
};

export default ConfirmationForm;
