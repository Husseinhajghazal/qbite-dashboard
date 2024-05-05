import axios from "axios";
import { signOut } from "next-auth/react";

const editMeal = async (
  mealId: string,
  token: string,
  body: Record<string, any>
) => {
  const formData = new FormData();

  formData.append("slug", body.slug);
  formData.append("categoryId", body.categoryId);
  formData.append("defaultImgIndex", body.defaultImgIndex);
  formData.append("prices", JSON.stringify(body.prices));
  formData.append("images", JSON.stringify(body.images));
  formData.append("details", JSON.stringify([]));
  formData.append("name", JSON.stringify(body.name));
  formData.append("description", JSON.stringify(body.description));
  for (const image of body.productImages) {
    formData.append("productImages", image);
  }

  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${mealId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language": body.language,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default editMeal;
