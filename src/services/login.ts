import axios from "axios";
// import type { AppStoreOwnerSigninResponse } from "@/backend/src/modules/store-owner/auth/dto/signin.dto";

const login = (email: string, password: string) => {
  const Language = localStorage.getItem("language");

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      email,
      password,
    },
    { headers: { "Accept-Language": Language } }
  );
};

export default login;
