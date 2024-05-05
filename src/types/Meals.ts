import { Category } from "./Category";
import { TranslatedProp } from "./Store";

interface Image {
  imageURL: string;
}

export interface price {
  id?: number;
  currencyId: number;
  price: number;
}

export interface Meals {
  id: string;
  images: Image[];
  prices: price[];
  name: TranslatedProp;
  category: Category;
}
