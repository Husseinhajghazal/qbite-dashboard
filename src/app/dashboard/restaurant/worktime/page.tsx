import ChangeWorkTimes from "@/components/dashboard/restaurant/ChangeWorkTimes";
import { getStore } from "@/utils/getStore";
import React from "react";

const page = async () => {
  const { errorMessage, store } = await getStore();

  const myStore = {
    closingHours: store?.closingHours || "",
    openingHours: store?.openingHours || "",
  };

  return <ChangeWorkTimes errorMessage={errorMessage} store={myStore} />;
};

export default page;
