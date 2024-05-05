import axios from "axios";

const confirmingAccount = (
  email: string,
  password: string,
  signupCode: string
) => {
  const Language = localStorage.getItem("language");

  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup/confirm`,
    {
      email,
      signupCode,
      password,
    },
    { headers: { "Accept-Language": Language } }
  );
};

export default confirmingAccount;
