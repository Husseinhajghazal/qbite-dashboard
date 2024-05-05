import axios from "axios";

const changePassword = (
  newPassword: string,
  password: string,
  token: string
) => {
  const Language = localStorage.getItem("language");

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/by-password`,
    { newPassword, password },
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default changePassword;
