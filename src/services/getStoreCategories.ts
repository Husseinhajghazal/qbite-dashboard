import getSession from "@/utils/getSession";
import axios from "axios";

const getStoreCategories = async () => {
  const session = await getSession();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/by-store/${session?.storeOwner.stores[0].id}`,
    {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );

  const categoriesData = res.data.data.categories;
  return categoriesData;
};

export default getStoreCategories;
