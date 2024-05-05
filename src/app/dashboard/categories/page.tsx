import Categories from "@/components/dashboard/Categories/Categories";
import getStoreCategories from "@/services/getStoreCategories";
import { Category } from "@/types/Category";
import React from "react";

const page = async () => {
  let categoriesData: Category[] = await getStoreCategories();

  categoriesData = categoriesData.map((e: Category) => ({
    id: e.id,
    icon: e.icon,
    name: e.name,
  }));

  return <Categories categoriesData={categoriesData} />;
};

export default page;
