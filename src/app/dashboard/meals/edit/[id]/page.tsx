import EditMeals from "@/components/dashboard/meals/EditMeals";
import getCurrencies from "@/services/getCurrencies";
import getMealById from "@/services/getMealById";
import getMealDetails from "@/services/getMealDetails";
import getStoreCategories from "@/services/getStoreCategories";
import { Category } from "@/types/Category";
import { Currency } from "@/types/Currency";
import { MealDetail } from "@/types/MealDetail";
import { TranslatedProp } from "@/types/Store";
import React from "react";

interface Image {
  imageURL: string;
  id: number;
  isDefault: boolean;
  isVisible: boolean;
}

interface price {
  id: number;
  currencyId: number;
  price: number;
}

interface ProductDetails {
  icon: string;
  unit: TranslatedProp;
}

interface Detail {
  value: string;
  productDetails: ProductDetails;
}

export interface Meal {
  id: string;
  images: Image[];
  prices: price[];
  name: TranslatedProp;
  description: TranslatedProp;
  category: Category;
  details: Detail[];
}

const page = async ({ params }: { params: any }) => {
  let Meal: Meal = await getMealById(params.id);
  let categoriesData: Category[] = await getStoreCategories();
  let Currencies: Currency[] = await getCurrencies();
  let details: MealDetail[] = await getMealDetails();

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

  Meal = {
    id: Meal.id,
    images: Meal.images,
    description: Meal.description,
    prices: Meal.prices,
    name: Meal.name,
    category: Meal.category,
    details: Meal.details,
  };

  details = details.map((e: MealDetail) => ({
    id: e.id,
    icon: e.icon,
    unit: e.unit,
  }));

  return (
    <EditMeals
      details={details}
      Meal={Meal}
      categoriesData={categoriesData}
      Currencies={Currencies}
    />
  );
};

export default page;
