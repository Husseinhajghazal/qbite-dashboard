import { SideBarItemI } from "@/types/SideBar";
import {
  MdFastfood,
  MdOutlineHelpOutline,
  MdOutlineCreateNewFolder,
  MdAccessTime,
  MdOutlineTextSnippet,
} from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { IoStatsChart, IoColorPaletteOutline } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import { BiCategoryAlt, BiSolidUserDetail } from "react-icons/bi";

export const NavItems: SideBarItemI[] = [
  {
    icon: <IoStatsChart size={20} />,
    name: { en: "Home", ar: "الصفحة الرئيسية" },
    notification: false,
    link: "/dashboard",
    subNavItems: [],
  },
  {
    icon: <MdFastfood size={20} />,
    name: { en: "Meals", ar: "الوجبات" },
    notification: false,
    link: "/dashboard/meals",
    subNavItems: [
      {
        icon: <RiEditBoxLine size={20} />,
        name: { en: "Edit", ar: "تعديل" },
        notification: false,
        link: "/dashboard/meals/edit",
        subNavItems: [],
      },
      {
        icon: <MdOutlineCreateNewFolder size={20} />,
        name: { en: "Create", ar: "إنشاء" },
        notification: false,
        link: "/dashboard/meals/create",
        subNavItems: [],
      },
    ],
  },
  {
    icon: <BiCategoryAlt size={20} />,
    name: { en: "Categories", ar: "الأصناف" },
    notification: false,
    link: "/dashboard/categories",
    subNavItems: [],
  },
  {
    icon: <FaPaintBrush size={20} />,
    name: { en: "Restaurant", ar: "المطعم" },
    notification: false,
    link: "/dashboard/restaurant/logo-&-background",
    subNavItems: [
      {
        icon: <IoIosImages size={20} />,
        name: { en: "Logo & Background", ar: "الشعار وصورة الغلاف" },
        notification: false,
        link: "/dashboard/restaurant/logo-&-background",
        subNavItems: [],
      },
      {
        icon: <MdAccessTime size={20} />,
        name: { en: "Worktime", ar: "أوقات العمل" },
        notification: false,
        link: "/dashboard/restaurant/worktime",
        subNavItems: [],
      },
      {
        icon: <BiSolidUserDetail size={20} />,
        name: { en: "Information", ar: "المعلومات" },
        notification: false,
        link: "/dashboard/restaurant/information",
        subNavItems: [],
      },
      {
        icon: <MdOutlineTextSnippet size={20} />,
        name: { en: "Description", ar: "الوصف" },
        notification: false,
        link: "/dashboard/restaurant/description",
        subNavItems: [],
      },
      {
        icon: <IoColorPaletteOutline size={20} />,
        name: { en: "Theme", ar: "السمة" },
        notification: false,
        link: "/dashboard/restaurant/theme",
        subNavItems: [],
      },
    ],
  },
  {
    icon: <BsQrCodeScan size={20} />,
    name: { en: "QBite", ar: "كيو بايت" },
    notification: false,
    link: "/dashboard/qbite",
    subNavItems: [],
  },
  {
    icon: <MdOutlineHelpOutline size={20} />,
    name: { en: "Support", ar: "الدعم" },
    notification: false,
    link: "/dashboard/support",
    subNavItems: [],
  },
];
