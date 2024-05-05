import ChangeColors from "@/components/dashboard/restaurant/ChangeColors";
import { getStore } from "@/utils/getStore";
import React from "react";

const page = async () => {
  const { errorMessage, store } = await getStore();

  const myStore = {
    backgroundColor: store?.backgroundColor || "#ffffff",
    primaryColor: store?.primaryColor || "#ffffff",
    secondaryColor: store?.secondaryColor || "#ffffff",
  };

  return <ChangeColors errorMessage={errorMessage} store={myStore} />;
};

export default page;
