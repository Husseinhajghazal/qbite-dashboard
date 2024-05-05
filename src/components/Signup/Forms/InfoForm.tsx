import React from "react";
import { motion } from "framer-motion";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/Input";
import { FormValues } from "@/types/InfoForm";
import Button from "../../Buttons/Button";

const InfoForm = ({ nextStep }: { nextStep: () => void }) => {
  const initialValues: FormValues = {
    restaurantName: localStorage.getItem("restaurantName") || "",
    slogan: localStorage.getItem("slogan") || "",
    username: localStorage.getItem("username") || "",
    phoneNumber: localStorage.getItem("phoneNumber") || "",
  };

  const validationSchema = Yup.object({
    restaurantName: Yup.string().required("Required."),
    username: Yup.string().required("Required."),
    phoneNumber: Yup.string()
      .required("Required.")
      .matches(
        /^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/,
        "Invalid phone number format"
      ),
  });

  const handleSubmit = (values: FormValues) => {
    localStorage.setItem("restaurantName", values.restaurantName);
    localStorage.setItem("slogan", values.slogan);
    localStorage.setItem("username", values.username);
    localStorage.setItem("phoneNumber", values.phoneNumber);
    nextStep();
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
        setFieldValue,
        setFieldTouched,
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
          <div className="mb-6">
            <Input
              id="restaurantName"
              type="text"
              placeholder="Restaurant Name"
              className="mb-5"
              value={values.restaurantName}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.restaurantName && touched.restaurantName}
              error={errors.restaurantName}
            />
            <Input
              id="slogan"
              type="text"
              placeholder="Slogan (optional)"
              className="mb-5"
              value={values.slogan}
              onChange={handleChange}
              onBlur={handleBlur}
              valid={errors.slogan && touched.slogan}
              error={errors.slogan}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className=""
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                valid={errors.username && touched.username}
                error={errors.username}
              />
              <Input
                id="phoneNumber"
                type="phonenumber"
                placeholder="Phone Number"
                value={values.phoneNumber}
                onChange={(value) => setFieldValue("phoneNumber", value)}
                className=""
                onBlur={() => setFieldTouched("phoneNumber", true)}
                valid={errors.phoneNumber && touched.phoneNumber}
                error={errors.phoneNumber}
              />
            </div>
          </div>
          <Button onClick={() => {}} />
        </motion.form>
      )}
    </Formik>
  );
};

export default InfoForm;
