import getSession from "@/utils/getSession";
import axios from "axios";

const getMealDetails = async () => {
  const session = await getSession();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/detail/${session?.storeOwner.stores[0].id}`,
    {
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const details = res.data.data.details;
  return details;
};

export default getMealDetails;
