import getSession from "@/utils/getSession";
import axios from "axios";

const getStoreMeals = async () => {
  const session = await getSession();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/by-store/${session?.storeOwner.stores[0].id}`,
    {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const MealsData = res.data.data.products;
  return MealsData;
};

export default getStoreMeals;
