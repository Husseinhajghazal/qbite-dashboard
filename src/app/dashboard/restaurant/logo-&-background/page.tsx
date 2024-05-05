import ChangeImages from "@/components/dashboard/restaurant/ChangeImages";
import { getStore } from "@/utils/getStore";
import React from "react";

const page = async () => {
  const { errorMessage, store } = await getStore();

  const myStore = {
    backgroundURL: store.backgroundURL,
    logoURL: store.logoURL,
  };

  return <ChangeImages errorMessage={errorMessage} store={myStore} />;
};

export default page;
