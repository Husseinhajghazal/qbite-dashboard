import axios from "axios";
import getSession from "@/utils/getSession";
import { QrForm } from "@/types/QrForm";

const getStoreQrCode = async () => {
  const session = await getSession();
  let qrCode: QrForm | null = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/qr-code/${session?.storeOwner.stores[0].id}`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    qrCode = res.data.data.qrCode;
  } catch {
    qrCode = null;
  }

  return qrCode;
};

export default getStoreQrCode;
