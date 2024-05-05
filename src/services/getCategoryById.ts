import axios from "axios";

const getCategoryById = async (categoryId: string, token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`,
    {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const categoryData = res.data.data.category;
  return categoryData;
};

export default getCategoryById;
