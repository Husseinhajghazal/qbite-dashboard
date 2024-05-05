import ChangeSeo from "@/components/dashboard/restaurant/ChangeSeo";
import { getStore } from "@/utils/getStore";
import React from "react";

const page = async () => {
  const { errorMessage, store } = await getStore();

  const myStore = {
    username: store.username,
    description: store.description,
    slogan: store.slogan,
  };

  return <ChangeSeo errorMessage={errorMessage} store={myStore} />;
};

export default page;
