import axios from "axios";
import { signOut } from "next-auth/react";

const deleteCategory = (token: string, categoryId: string) => {
  const Language = localStorage.getItem("language");

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`,
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default deleteCategory;
