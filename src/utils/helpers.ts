import { Currency } from "@/types/Currency";
import { languages } from "@/types/Languages";
import { price } from "@/types/Meals";
import { TranslatedProp } from "@/types/Store";

export const addChangedValuesToBody = (
  body: Record<string, any>,
  key: string,
  newValue: any,
  oldValue: any
) => {
  if (newValue !== oldValue) {
    body[key] = newValue;
  }
};

export const changeTextLanguage = (
  translated: TranslatedProp | null,
  language: "en" | "ar",
  defaultValue: any
): string => {
  if (!translated) {
    return defaultValue;
  }

  const { languageId } = translated;
  const languageIdToFind = languages[language];

  if (languageId === languageIdToFind) {
    return translated.fallback;
  }

  const { translations } = translated;

  if (!translations || translations.length === 0) {
    return defaultValue;
  }

  const foundTranslation = translations.find(
    (e) => e.languageId === languageIdToFind
  );

  return foundTranslation ? foundTranslation.text : defaultValue;
};

export const nameToSlug = (name: string) => {
  return name.toLowerCase().replace(" ", "-");
};

export const mergeCurrency = (price: price, Currencies: Currency[]) => {
  const foundCurrency = Currencies.find((e) => e.id === price.currencyId);

  return price.price + " " + foundCurrency?.symbol;
};

export const getCurrencyValue = (currencyId: number, prices: price[]) => {
  const foundCurrency = prices.find((e) => e.currencyId === currencyId);

  return foundCurrency ? foundCurrency.price.toString() : "";
};

export const updatePrice = (
  currencyId: number,
  price: number,
  prices: price[]
) => {
  let myPrices = prices;

  const foundedPriceIndex = myPrices.findIndex(
    (e) => e.currencyId === currencyId
  );

  if (foundedPriceIndex !== -1 && myPrices[foundedPriceIndex].price !== price) {
    myPrices[foundedPriceIndex] = {
      ...myPrices[foundedPriceIndex],
      price: price,
    };
  } else if (foundedPriceIndex === -1) {
    myPrices.push({ currencyId: currencyId, price: price });
  }

  return myPrices;
};

export function objectToFormData(obj: Record<string, string>): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}
