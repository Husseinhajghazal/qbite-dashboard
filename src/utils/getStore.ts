import axios from "axios";
import getSession from "./getSession";

export async function getStore() {
  const session = await getSession();

  let store = null;
  let errorMessage: null | string = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/stores/${session?.storeOwner.stores[0].id}`,
      {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    store = res.data.data.store;
  } catch (error: any) {
    errorMessage = error.response.data.message;
  }

  return { errorMessage, store };
}
