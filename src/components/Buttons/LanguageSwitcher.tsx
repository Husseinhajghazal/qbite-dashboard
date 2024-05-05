"use client";

import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "@/store/reducers/language";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = ({ x, y }: { x: string; y: string }) => {
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    dispatch(
      changeLanguage({
        language: storedLanguage === null ? "en" : storedLanguage,
      })
    );
    i18n.changeLanguage(storedLanguage === null ? "en" : storedLanguage);
  }, [dispatch, i18n]);

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(changeLanguage({ language: newLanguage }));
    i18n.changeLanguage(newLanguage);
  };

  const isLanguageActive = (targetLanguage: string) => {
    return language === targetLanguage;
  };

  const renderLanguageButton = (label: string, languageCode: string) => {
    const isActive = isLanguageActive(languageCode);

    return (
      <div
        key={languageCode}
        className={`px-4 py-2 rounded-2xl cursor-pointer font-semibold ${
          isActive ? "text-white bg-[#2f834f]" : ""
        }`}
        onClick={() => handleLanguageChange(languageCode)}
        style={{
          transition: "background-color 0.2s ease-in-out",
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 50,
      }}
      className={`fixed z-20 ${y == "top" ? "top-3" : "bottom-4"} ${
        i18n.language == "en"
          ? x == "left"
            ? "left-3"
            : "right-3"
          : x == "left"
          ? "right-3"
          : "left-3"
      } bg-white flex flex-col rounded-2xl`}
    >
      {renderLanguageButton("En", "en")}
      {renderLanguageButton("Ar", "ar")}
    </motion.div>
  );
};

export default LanguageSwitcher;
