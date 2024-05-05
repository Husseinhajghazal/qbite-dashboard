import { SideBarItemI } from "@/types/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleExpanded } from "@/store/reducers/sidebar";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const SideBarItem: React.FC<SideBarItemI> = ({
  icon,
  name,
  notification,
  subNavItems,
  link,
}) => {
  const dispatch = useDispatch();
  const expanded = useSelector((state: RootState) => state.sideBar.expanded);
  const [show, setShow] = useState(false);
  const path = usePathname();
  const [t, i18n] = useTranslation("global");

  return (
    <React.Fragment>
      <div
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-300 group ${
          path == link
            ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
            : "hover:bg-green-50 text-gray-600"
        }`}
      >
        <Link
          href={link}
          onClick={() => expanded == true && dispatch(toggleExpanded())}
          className="flex flex-1"
        >
          {icon}
          <span
            className={`overflow-hidden transition-all duration-300 ${
              expanded
                ? i18n.language == "ar"
                  ? "w-full mr-3"
                  : "w-full ml-3"
                : "w-0 h-0 ml-0"
            }`}
          >
            {i18n.language == "ar" ? name.ar : name.en}
          </span>
        </Link>
        {notification && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-green-400 transition-all duration-300 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {expanded && subNavItems.length > 0 && (
          <div
            className={`mr-3 transform-all duration-300 ${
              show && "rotate-180"
            }`}
            onClick={() => setShow(!show)}
          >
            <IoIosArrowDown />
          </div>
        )}
        {!expanded && (
          <div
            className={`absolute ${
              i18n.language == "ar" ? "right-full mr-6" : "left-full ml-6"
            } rounded-md px-2 py-1 bg-green-100 text-green-800 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {i18n.language == "ar" ? name.ar : name.en}
          </div>
        )}
      </div>
      {expanded && subNavItems.length > 0 && (
        <ul
          className={`pl-3 overflow-hidden transition-all duration-1000 ${
            show ? "max-h-screen" : "max-h-0"
          }`}
        >
          {show &&
            subNavItems.map((e, index) => (
              <SideBarItem
                key={index}
                icon={e.icon}
                name={e.name}
                notification={e.notification}
                link={e.link}
                subNavItems={e.subNavItems}
              />
            ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default SideBarItem;
