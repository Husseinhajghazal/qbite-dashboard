import QrCustomize from "@/components/dashboard/QrCustomize";
import getStoreQrCode from "@/services/getStoreQrCode";
import { getStore } from "@/utils/getStore";
import React from "react";

const Page = async () => {
  const { errorMessage, store } = await getStore();
  const qrCode = await getStoreQrCode();

  return (
    <QrCustomize
      qrCode={qrCode}
      username={store.username}
      logoUrl={store.logoURL}
    />
  );
};

export default Page;
