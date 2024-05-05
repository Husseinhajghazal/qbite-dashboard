import axios from "axios";
import { signOut } from "next-auth/react";

const deleteMeal = (token: string, productId: string) => {
  const Language = localStorage.getItem("language");

  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default deleteMeal;
