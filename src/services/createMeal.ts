import axios from "axios";
import { signOut } from "next-auth/react";

function createFormData(formData: FormData, key: string, data: any) {
  if (data === Object(data) || Array.isArray(data)) {
    if (Array.isArray(data) && data.length == 0) {
      formData.append(key, JSON.stringify(data));
    } else {
      for (var i in data) {
        createFormData(formData, key + "[" + i + "]", data[i]);
      }
    }
  } else {
    formData.append(key, data);
  }
}

const createMeal = (token: string, body: Record<string, any>) => {
  const formData = new FormData();

  formData.append("slug", body.slug);
  formData.append("categoryId", body.categoryId);
  formData.append("storeId", body.storeId);
  formData.append("language", body.language);
  formData.append("defaultImgIndex", body.defaultImgIndex);
  formData.append("name", body.name);
  formData.append("description", body.description);
  for (const image of body.productImages) {
    formData.append("productImages", image);
  }
  createFormData(formData, "details", body.details);
  createFormData(formData, "prices", body.prices);

  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept-Language": body.language,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createMeal;
