import axios from "axios";
import { signOut } from "next-auth/react";

const createCategory = (token: string, body: Record<string, any>) => {
  const Language = localStorage.getItem("language");

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`, body, {
    headers: {
      "Accept-Language": Language,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createCategory;
