import axios from "axios";
import { signOut } from "next-auth/react";

const editQr = (body: Record<string, any>, qrCodeId: number, token: string) => {
  const Language = localStorage.getItem("language");

  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/qr-code/${qrCodeId}`,
    body,
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default editQr;
