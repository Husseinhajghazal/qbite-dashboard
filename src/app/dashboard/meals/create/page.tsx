import CreateMeal from "@/components/dashboard/meals/CreateMeal";
import getCurrencies from "@/services/getCurrencies";
import getMealDetails from "@/services/getMealDetails";
import getStoreCategories from "@/services/getStoreCategories";
import { Category } from "@/types/Category";
import { Currency } from "@/types/Currency";
import { MealDetail } from "@/types/MealDetail";
import React from "react";

const page = async () => {
  let details: MealDetail[] = await getMealDetails();
  let categoriesData: Category[] = await getStoreCategories();
  let Currencies: Currency[] = await getCurrencies();

  Currencies = Currencies.map((e: Currency) => ({
    id: e.id,
    symbol: e.symbol,
    name: e.name,
  }));

  categoriesData = categoriesData.map((e: Category) => ({
    id: e.id,
    icon: e.icon,
    name: e.name,
  }));

  details = details.map((e: MealDetail) => ({
    id: e.id,
    icon: e.icon,
    unit: e.unit,
  }));

  return (
    <CreateMeal
      details={details}
      categoriesData={categoriesData}
      Currencies={Currencies}
    />
  );
};

export default page;
