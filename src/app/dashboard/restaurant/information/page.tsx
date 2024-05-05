import ChangeInforamtion from "@/components/dashboard/restaurant/ChangeInforamtion";
import { getStore } from "@/utils/getStore";

const page = async () => {
  const { errorMessage, store } = await getStore();

  const myStore = {
    restaurantName: store.name,
    phoneNumber: store.phoneNumber,
    country: store.country,
    city: store.city,
  };

  return <ChangeInforamtion errorMessage={errorMessage} store={myStore} />;
};

export default page;
