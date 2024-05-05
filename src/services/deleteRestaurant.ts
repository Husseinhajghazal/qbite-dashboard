import axios from "axios";
import { signOut } from "next-auth/react";

const deleteRestaurant = (token: string) => {
  const Language = localStorage.getItem("language");

  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/store-owner`, {
    headers: {
      "Accept-Language": Language,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default deleteRestaurant;
