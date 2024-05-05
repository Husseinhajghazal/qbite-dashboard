import axios from "axios";
import { signOut } from "next-auth/react";

const saveQr = (body: Record<string, any>, storeId: number, token: string) => {
  const Language = localStorage.getItem("language");

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/qr-code/${storeId}`,
    body,
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default saveQr;
