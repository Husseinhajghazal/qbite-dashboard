import React from "react";
import { motion } from "framer-motion";
import Button from "../../Buttons/Button";
import { FormValues } from "@/types/ImageForm";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../../Input/Input";
import usePending from "@/hooks/usePending";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import createStore from "@/services/createStore";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE: number = 5 * 1024 * 1024;

const validFileExtensions: { [key: string]: string[] } = {
  image: ["jpg", "png", "jpeg"],
};

function isValidFileType(fileName: string, fileType: string): boolean {
  if (fileName) {
    return (
      validFileExtensions[fileType].indexOf(fileName.split(".").pop() || "") >
      -1
    );
  }
  return false;
}

const ImageForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      logoFile,
      backgroundFile,
    }: {
      logoFile: File;
      backgroundFile: File;
    }) =>
      createStore({
        logoFile,
        backgroundFile,
      }),
    onError: (error: { response: { data: { message: string } } }) =>
      toast.error(error.response.data.message || "Unexpected error!"),
    onSuccess: (data) => {
      toast.success(data.data.message);
      localStorage.clear();
      router.push("/");
    },
  });

  usePending({ isPending, message: "Creating your menu..." });

  const initialValues: FormValues = {
    cover: null,
    logo: null,
  };

  const validationSchema = Yup.object({
    cover: Yup.mixed()
      .required("Required.")
      .test("is-valid-size", "Max allowed size is 5MB", function (value) {
        if (value instanceof File) {
          return value.size <= MAX_FILE_SIZE;
        }
        return true;
      })
      .test("is-valid-type", "Not a valid image type", function (value) {
        if (value && value instanceof File) {
          return isValidFileType(value.name.toLowerCase(), "image");
        }
        return true;
      }),
    logo: Yup.mixed()
      .required("Required.")
      .test("is-valid-size", "Max allowed size is 5MB", function (value) {
        if (value instanceof File) {
          return value.size <= MAX_FILE_SIZE;
        }
        return true;
      })
      .test("is-valid-type", "Not a valid image type", function (value) {
        if (value && value instanceof File) {
          return isValidFileType(value.name.toLowerCase(), "image");
        }
        return true;
      }),
  });

  const handleSubmit = async (values: FormValues) => {
    const logoFile = values.logo as File;
    const backgroundFile = values.cover as File;

    mutate({ logoFile, backgroundFile });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
        <motion.form
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 50,
          }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <div className="flex-col-reverse md:flex-row flex gap-5">
            <Input
              type="image"
              className="w-[300px] h-[125px] md:w-[500px] md:h-[200px]"
              placeholder=""
              id="cover"
              value=""
              onChange={(b: any) => {
                setFieldValue("cover", b);
              }}
              onBlur={handleBlur}
              valid={errors.cover && touched.cover}
              error={errors.cover}
            />
            <Input
              type="image"
              className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
              placeholder=""
              id="logo"
              value=""
              onChange={(b: any) => {
                setFieldValue("logo", b);
              }}
              onBlur={handleBlur}
              valid={errors.logo && touched.logo}
              error={errors.logo}
            />
          </div>
          <Button onClick={() => {}} />
        </motion.form>
      )}
    </Formik>
  );
};

export default ImageForm;
