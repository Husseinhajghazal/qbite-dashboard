import LanguageSwitcher from "@/components/Buttons/LanguageSwitcher";
import SideBar from "@/components/dashboard/SideBar/SideBar";
import authenticate from "@/utils/Authentication";
import { getStore } from "@/utils/getStore";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  await authenticate("notAuth");
  const { store } = await getStore();

  return (
    <React.Fragment>
      <SideBar logoURL={store?.logoURL} />
      {children}
      <LanguageSwitcher y="bottom" x="right" />
    </React.Fragment>
  );
};

export default layout;
