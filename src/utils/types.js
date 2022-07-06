import { shape, number, string } from "prop-types";

export const ingredientType = shape({
  image_mobile: string.isRequired,
  image_large: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  calories: number.isRequired,
  proteins: number.isRequired,
  fat: number.isRequired,
  carbohydrates: number.isRequired,
});

