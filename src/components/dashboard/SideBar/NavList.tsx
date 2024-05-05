import React from "react";
import SideBarItem from "./NavItem";
import { NavItems } from "@/Data/NavItems";
import { useTranslation } from "react-i18next";

const NavList = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <ul dir={i18n.language == "ar" ? "rtl" : "ltr"} className="flex-1 px-3">
      {NavItems.slice(0, 5).map((e, index) => (
        <SideBarItem
          icon={e.icon}
          name={e.name}
          notification={e.notification}
          subNavItems={e.subNavItems}
          link={e.link}
          key={index}
        />
      ))}
      <hr className="my-3" />
      {NavItems.slice(5).map((e, index) => (
        <SideBarItem
          icon={e.icon}
          name={e.name}
          notification={e.notification}
          subNavItems={e.subNavItems}
          link={e.link}
          key={index}
        />
      ))}
    </ul>
  );
};

export default NavList;
