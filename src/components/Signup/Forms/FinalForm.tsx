import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Button from "../../Buttons/Button";
import Input from "../../Input/Input";
import { FormValues } from "@/types/FinalForm";

const FinalForm = ({ nextStep }: { nextStep: () => void }) => {
  const initialValues: FormValues = {
    description: localStorage.getItem("description") || "",
    currency: localStorage.getItem("currency") || "₺ - TL",
    startTime: localStorage.getItem("startTime") || Date.now().toString(),
    endTime: localStorage.getItem("endTime") || Date.now().toString(),
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Required."),
    currency: Yup.string().required("Required."),
    startTime: Yup.string().required("Required."),
    endTime: Yup.string().required("Required."),
  });

  const handleSubmit = (values: FormValues) => {
    localStorage.setItem("description", values.description);
    localStorage.setItem("currency", values.currency);
    localStorage.setItem("startTime", values.startTime);
    localStorage.setItem("endTime", values.endTime);
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
            type="textarea"
            placeholder="Descrption about your Restaurant"
            id="description"
            className="mb-2"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            valid={errors.description && touched.description}
            error={errors.description}
          />
          <div className="mb-2">
            <select
              id="currency"
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border-2 w-full rounded-2xl py-2 px-4 outline-none duration-300 appearance-none ${
                errors.currency && touched.currency
                  ? "border-[#ff4a4a] focus:border-[#ff4a4a] hover:border-[#ff4a4a] caret-[#ff4a4a]"
                  : "border-gray-300 focus:border-[#2f834f] hover:border-[#2f834f] caret-[#71c381]"
              }`}
            >
              <option defaultChecked value="₺ - Tl">
                &#8378; - Turkish Lira
              </option>
              <option value="1">&#36; - Dollar</option>
              <option value="2">&#8364; - Euro</option>
            </select>
            {errors.currency && touched.currency && (
              <p className="text-[12px] text-start ml-2 text-[#ff4a4a]">
                {errors.currency}
              </p>
            )}
          </div>
          <div className="w-full grid md:grid-cols-2 gap-5 mb-3">
            <Input
              type="time"
              placeholder="Opening Time"
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
              placeholder="Closing Time"
              id="endTime"
              className=""
              value={values.endTime}
              onChange={(e) => setFieldValue("endTime", e)}
              onBlur={handleBlur}
              valid={errors.endTime && touched.endTime}
              error={errors.endTime}
            />
          </div>
          <Button onClick={() => {}} />
        </motion.form>
      )}
    </Formik>
  );
};

export default FinalForm;
