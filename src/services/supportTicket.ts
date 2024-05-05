import axios from "axios";
import { signOut } from "next-auth/react";

const supportTicket = (
  token: string,
  storeId: string,
  body: Record<string, any>
) => {
  const Language = localStorage.getItem("language");

  const formData = new FormData();

  formData.append("subject", body.subject);
  formData.append("description", body.description);
  formData.append("storeId", storeId);
  for (const image of body.images) {
    formData.append("images", image);
  }

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/support-ticket`,
    formData,
    {
      headers: {
        "Accept-Language": Language,
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default supportTicket;
