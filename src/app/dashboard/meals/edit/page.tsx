import AllMeals from "@/components/dashboard/meals/AllMeals";
import getCurrencies from "@/services/getCurrencies";
import getStoreMeals from "@/services/getStoreMeals";
import { Currency } from "@/types/Currency";
import { Meals } from "@/types/Meals";
import React from "react";

const page = async () => {
  let MealsData: Meals[] = await getStoreMeals();
  let Currencies: Currency[] = await getCurrencies();

  Currencies = Currencies.map((e: Currency) => ({
    id: e.id,
    symbol: e.symbol,
    name: e.name,
  }));

  MealsData = MealsData.map((e: Meals) => ({
    id: e.id,
    images: e.images.map((i) => ({ imageURL: i.imageURL })),
    prices: e.prices.map((p) => ({
      currencyId: p.currencyId,
      price: p.price,
    })),
    name: e.name,
    category: e.category,
  }));

  return <AllMeals MealsData={MealsData} Currencies={Currencies} />;
};

export default page;
