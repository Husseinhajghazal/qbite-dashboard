import axios from "axios";

const logout = (token: string) => {
  const Language = localStorage.getItem("language");

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {},
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default logout;
