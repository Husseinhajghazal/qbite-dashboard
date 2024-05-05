"use client";

import { Fragment } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleExpanded } from "@/store/reducers/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NavList from "./NavList";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import logout from "@/services/logout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import usePending from "@/hooks/usePending";
import { useTranslation } from "react-i18next";

const SideBar = ({ logoURL }: { logoURL: string }) => {
  const expanded = useSelector((state: RootState) => state.sideBar.expanded);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [t, i18n] = useTranslation("global");

  const firstName = session?.user.storeOwner.firstName || "Restaurant";
  const lastName = session?.user.storeOwner.lastName || "Owner";

  const { isPending, mutate } = useMutation({
    mutationFn: () => logout(session?.user?.token!),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      signOut();
      router.push("/");
    },
  });

  usePending({ isPending, message: "Loging you out..." });

  const logoutFn = async () => {
    mutate();
  };

  return (
    <Fragment>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen z-10 h-screen bg-[#0000004c] text-orange-500"
            onClick={() => dispatch(toggleExpanded())}
          />
        )}
      </AnimatePresence>
      <aside
        className={`fixed top-0 ${
          i18n.language == "ar" ? "right-0" : "left-0"
        } h-screen z-10 transition-all duration-300 ${
          expanded ? "w-[250px] md:w-[350px]" : "w-[68px]"
        }`}
      >
        <nav
          className={`h-full flex flex-col bg-[#fafafa] ${
            i18n.language == "ar"
              ? "rounded-s-2xl border-l"
              : "rounded-e-2xl border-r"
          }`}
        >
          <div
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className="p-4 pb-2 flex justify-between items-center border-b mb-3"
          >
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded ? "w-[100px]" : "w-0"
              }`}
            >
              <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + logoURL}
                alt=""
                width={500}
                height={500}
                className={`max-h-12 w-fit`}
              />
            </div>
            <button
              onClick={() => dispatch(toggleExpanded())}
              className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 overflow-hidden transition-all duration-300 ${
                !expanded && "mx-auto"
              }`}
            >
              {expanded ? <IoMdClose /> : <IoMenu />}
            </button>
          </div>
          <NavList />
          <div
            dir={i18n.language == "ar" ? "rtl" : "ltr"}
            className="border-t flex p-3"
          >
            <Link
              href="/dashboard/user"
              onClick={() => expanded == true && dispatch(toggleExpanded())}
              className="w-10 h-10 cursor-pointer"
            >
              <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + logoURL}
                className="rounded-md"
                alt=""
                width={500}
                height={500}
              />
            </Link>
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
                expanded
                  ? i18n.language == "ar"
                    ? "w-full mr-3"
                    : "w-full ml-3"
                  : "w-0 ml-0"
              }`}
            >
              <Link
                href="/dashboard/user"
                onClick={() => expanded == true && dispatch(toggleExpanded())}
                className="leading-4"
              >
                <h4 className="font-semibold">{firstName + " " + lastName}</h4>
                <span className="text-xs text-gray-600">
                  {session?.user.storeOwner.email}
                </span>
              </Link>
              <MdLogout
                size={20}
                className="hover:text-rose-600 duration-300 cursor-pointer"
                onClick={logoutFn}
              />
            </div>
          </div>
        </nav>
      </aside>
    </Fragment>
  );
};

export default SideBar;
