import axios from "axios";

const createStore = ({
  logoFile,
  backgroundFile,
}: {
  logoFile: File;
  backgroundFile: File;
}) => {
  const backgroundColor = localStorage.getItem("backgroundColor")!;
  const city = "Istanbul";
  const closingHours = localStorage.getItem("endTime")!;
  const country = "Turkey";
  const openingHours = localStorage.getItem("startTime")!;
  const phoneNumber = localStorage.getItem("phoneNumber")!;
  const primaryColor = localStorage.getItem("primaryColor")!;
  const secondaryColor = localStorage.getItem("secondaryColor")!;
  const username = localStorage.getItem("username")!;
  const currencyId = localStorage.getItem("currencyId")!;
  const language = localStorage.getItem("language")!;
  const name = localStorage.getItem("restaurantName")!;
  const description = localStorage.getItem("slogan")!;
  const slogan = localStorage.getItem("slogan")!;
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("city", city);
  formData.append("country", country);
  formData.append("phoneNumber", phoneNumber);
  formData.append("username", username);
  formData.append("backgroundColor", backgroundColor);
  formData.append("primaryColor", primaryColor);
  formData.append("currencyId", currencyId);
  formData.append("secondaryColor", secondaryColor);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("slogan", slogan);
  formData.append("language", language);
  formData.append("logoFile", logoFile);
  formData.append("backgroundFile", backgroundFile);
  formData.append("openingHours", openingHours);
  formData.append("closingHours", closingHours);

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stores`, formData, {
    headers: {
      "Accept-Language": language,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createStore;
