"use client";

import React, { useState } from "react";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { FaUserEdit } from "react-icons/fa";
import ChangeUserInfo from "./ChangeUserInfo";
import DeletingAccount from "./DeletingAccount";
import { useTranslation } from "react-i18next";

const UserDashboard = () => {
  const [t, i18n] = useTranslation("global");

  const userSettingNav = [
    {
      id: 0,
      icon: <MdOutlineAlternateEmail size={20} />,
      name: { en: "Email", ar: "الحساب" },
    },
    {
      id: 1,
      icon: <MdPassword size={20} />,
      name: { en: "Password", ar: "كلمة السر" },
    },
    {
      id: 2,
      icon: <FaUserEdit size={20} />,
      name: { en: "User Info", ar: "معلومات المستخدم" },
    },
    {
      id: 3,
      icon: <AiOutlineUserDelete size={20} />,
      name: { en: "Delete Account", ar: "حذف الحساب" },
    },
  ];

  const [userSettingState, setUserSettingState] = useState(0);

  return (
    <div
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] h-screen pb-2 lg:pb-4`}
    >
      <div
        style={{ left: "calc(50% - 84px)" }}
        className="flex z-[1] gap-2 border-2 p-3 rounded-2xl bg-white w-fit absolute bottom-4"
      >
        {userSettingNav.slice(0, 3).map((e) => (
          <div
            onClick={() => setUserSettingState(e.id)}
            key={e.id}
            className={`font-medium rounded-md cursor-pointer transition-colors relative duration-300 p-2 group ${
              userSettingState == e.id
                ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
                : "hover:bg-green-50 text-gray-600"
            }`}
          >
            {e.icon}
            <div
              className={`absolute w-max bottom-10 rounded-md px-2 py-1 ml-4 bg-green-100 text-green-800 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {i18n.language == "ar" ? e.name.ar : e.name.en}
            </div>
          </div>
        ))}
        {userSettingNav.slice(3, 4).map((e) => (
          <div
            onClick={() => setUserSettingState(e.id)}
            key={e.id}
            className={`font-medium rounded-md cursor-pointer transition-colors relative duration-300 p-2 group ${
              userSettingState == e.id
                ? "bg-gradient-to-tr from-rose-200 to-rose-100 text-rose-800"
                : "hover:bg-rose-50 text-gray-600"
            }`}
          >
            {e.icon}
            <div
              className={`absolute w-max bottom-10 rounded-md px-2 py-1 ml-4 bg-rose-100 text-rose-800 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {i18n.language == "ar" ? e.name.ar : e.name.en}
            </div>
          </div>
        ))}
      </div>
      {userSettingState == 0 && <ChangeEmail />}
      {userSettingState == 1 && <ChangePassword />}
      {userSettingState == 2 && <ChangeUserInfo />}
      {userSettingState == 3 && <DeletingAccount />}
    </div>
  );
};

export default UserDashboard;
