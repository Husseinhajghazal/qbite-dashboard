export interface mealForm {
  images: (File | null)[];
  name: string;
  price: string;
  description: string;
  category: string;
  dishData: {
    icon: string;
    value: string;
    unit: string;
  }[];
  currency: string;
  language: string;
  // dishRecipe: {
  //   icon: string;
  //   name: string;
  // }[];
}
