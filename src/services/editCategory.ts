import axios from "axios";
import { signOut } from "next-auth/react";

const editCategory = async (
  categoryId: string,
  token: string,
  body: Record<string, any>
) => {
  const Language = localStorage.getItem("language");

  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`,
    body,
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default editCategory;
