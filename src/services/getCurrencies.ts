import axios from "axios";

const getCurrencies = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/currency`, {
    headers: {
      "Accept-Language": "en",
    },
  });
  const currencies = res.data.data.currencies;
  return currencies;
};

export default getCurrencies;
