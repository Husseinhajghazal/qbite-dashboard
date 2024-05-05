import axios from "axios";
import { signOut } from "next-auth/react";

const updateStoreOwner = (body: Record<string, string>, token: string) => {
  const Language = localStorage.getItem("language");

  return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/store-owner`, body, {
    headers: {
      "Accept-Language": Language,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default updateStoreOwner;
