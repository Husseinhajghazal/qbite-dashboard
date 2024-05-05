"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import GreenLogo from "../GreenLogo/GreenLogo";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FormValues } from "@/types/LoginForm";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const initialValues: FormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required.").email("Plese enter a valid email."),
  password: Yup.string()
    .required("Required.")
    .min(8, "Min length of the password should be 8.")
    .max(16, "Max length of the password should be 16.")
    .matches(/(?=.*?[A-Z])/g, "Password should contain at least 1 big letter.")
    .matches(
      /(?=.*?[a-z])/g,
      "Password should contain at least 1 small letter."
    )
    .matches(/(?=.*?[0-9])/g, "Password should contain at least 1 number."),
});

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!result?.ok) {
      return toast.error("Check your email and password.");
    }

    router.push("/dashboard/meals");
  };

  return (
    <>
      <GreenLogo />
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
            <Input
              id="email"
              type="email"
              className="mb-5 w-[280px] md:w-[400px]"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.email && touched.email}
              error={errors.email}
              placeholder="Email"
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="w-[280px] md:w-[400px]"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.password && touched.password}
              error={errors.password}
            />
            <p className="text-sm mb-5 pl-5 pt-1">
              Don&apos;t Have an account?{" "}
              <Link href="/signup" className="text-[#2f834f] underline">
                Go to signup
              </Link>
            </p>
            <Button onClick={() => {}} />
          </motion.form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
