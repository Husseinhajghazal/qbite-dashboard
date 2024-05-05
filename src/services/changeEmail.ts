import axios from "axios";

const changeEmail = (email: string, token: string) => {
  const Language = localStorage.getItem("language");

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/store-owner/change-email`,
    {
      email,
    },
    {
      headers: {
        "Accept-Language": Language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default changeEmail;
