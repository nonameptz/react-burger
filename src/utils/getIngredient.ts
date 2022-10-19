import {IIngredient, IIngredientsList} from "../types/store";
import {initSelectedIngredientState} from "./initStates";

export const getIngredient = (ingredients:IIngredientsList, id:string):IIngredient => {
  const ingredientsFlat = [
    ...ingredients.buns,
    ...ingredients.sauces,
    ...ingredients.mains,
  ]
  const ingredient = ingredientsFlat.find(ingredient => ingredient._id === id);
  if (ingredient) {
    return ingredient;
  }
  return initSelectedIngredientState;
}
