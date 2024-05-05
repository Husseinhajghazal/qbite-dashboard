import getSession from "@/utils/getSession";
import axios from "axios";

const getMealById = async (productId: string) => {
  const session = await getSession();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
    {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );

  const productData = res.data.data.product;
  return productData;
};

export default getMealById;
