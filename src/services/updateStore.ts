import axios from "axios";

const updateStore = (
  formData: FormData,
  storeId: number,
  token: string,
  language: string
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language": language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default updateStore;
