import Input from "@/components/Input/Input";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import EmojiPicker from "@/components/Input/EmojiPicker";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { Category } from "@/types/Category";
import { addChangedValuesToBody, changeTextLanguage } from "@/utils/helpers";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import usePending from "@/hooks/usePending";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import editCategory from "@/services/editCategory";
import createCategory from "@/services/createCategory";
import { addTranslation } from "@/services/language";
import { languagesList } from "@/Data/languagesList";
import SelectInput from "@/components/Input/SelectInput";
import { useTranslation } from "react-i18next";

const CategoryEditior = ({
  categoryToEdit,
  setCategoryToEdit,
  onClick,
  myCategoriesData,
  setMyCategoriesData,
}: {
  categoryToEdit: Category | null;
  setCategoryToEdit: () => void;
  onClick: () => void;
  myCategoriesData: Category[];
  setMyCategoriesData: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const session = useSession();
  const [t, i18n] = useTranslation("global");
  const CategoryEditior = document.getElementById("CategoryEditior")!;

  const { isPending, mutate } = useMutation({
    mutationFn: (body: Record<string, any>) => {
      if (categoryToEdit == null) {
        return createCategory(session.data?.user.token!, body);
      } else {
        return editCategory(
          categoryToEdit?.id!,
          session.data?.user.token!,
          body
        );
      }
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      setCategoryToEdit();
      onClick();
      toast.success(data.data.message);
      if (categoryToEdit == null) {
        setMyCategoriesData([...myCategoriesData, data.data.data.category]);
      } else {
        let temp = myCategoriesData;
        temp = temp.map((e) =>
          e.id === categoryToEdit.id ? data.data.data.category : e
        );
        setMyCategoriesData(temp);
      }
    },
  });

  usePending({ isPending, message: "Updating restaurant data..." });

  const initialValues = {
    icon: categoryToEdit?.icon || "🍔",
    name: categoryToEdit?.name.fallback || "",
    language: languageState,
  };

  const onSubmit = (values: typeof initialValues) => {
    let body: Record<string, any> = { icon: values.icon };

    if (categoryToEdit == null) {
      body = {
        ...body,
        language: values.language,
        storeId: session.data?.user.storeOwner.stores[0].id,
        name: values.name,
      };
    } else {
      addTranslation(
        body,
        "name",
        values.name,
        categoryToEdit.name,
        values.language
      );
    }

    mutate(body);
  };

  const validationSchema = Yup.object({
    icon: Yup.string().required("Required."),
    name: Yup.string().required("Required."),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    setFieldValue(
      "name",
      changeTextLanguage(
        categoryToEdit != null ? categoryToEdit.name : null,
        values.language,
        ""
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.language]);

  return createPortal(
    <motion.form
      initial={{ top: -300 }}
      animate={{ top: 50 }}
      exit={{ top: -300 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 200,
      }}
      onSubmit={handleSubmit}
      className={`fixed left-1/2 transform -translate-x-1/2 bg-white rounded-lg flex gap-3 w-fit h-fit p-3 z-20`}
    >
      <div className="w-[100px] h-[100px] bg-gray-200 rounded-full shadow-sm flex items-center justify-center">
        <EmojiPicker
          x="top-0"
          y="left-28"
          icon={values.icon}
          onChange={(e) => setFieldValue("icon", e)}
        />
      </div>
      <div>
        <Input
          type="text"
          className="w-[500px] mb-2"
          placeholder="Name"
          id="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          valid={touched.name && errors.name}
          error={errors.name}
        />
        <SelectInput
          className="mb-2"
          placeholder="Choose Language"
          id="language"
          value={values.language}
          onBlur={handleBlur}
          onChange={handleChange}
          valid={touched.language && errors.language}
          error={errors.language}
          array={languagesList}
        />
        <div>
          <button
            type="submit"
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-black p-2 pr-5 font-medium rounded-full bg-[#2f834f] text-white duration-300"
          >
            <p className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white text-[#2f834f]">
              <VscGitPullRequestCreate size={20} />
            </p>{" "}
            <span>{t("dashboard.categories.editButton")}</span>
          </button>
        </div>
      </div>
    </motion.form>,
    CategoryEditior
  );
};

export default CategoryEditior;
