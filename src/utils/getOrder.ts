import {IIngredient, IIngredientsList, TOrderPreview} from "../types/store";
import {getIngredient} from "./getIngredient";
import {inititalOrder} from "./initStates";
type TIngAmountData = {
  [id:string]: IIngredient & {
    amount: number;
  }
}
export const getOrder = (orders:Array<TOrderPreview>, id:number, ingredients:IIngredientsList):TOrderPreview => {
  let order = orders.find(order => order.number === id);
  if (order) {
    let total = 0;
    let ingredientsList:TIngAmountData = {};
    order.ingredients.forEach((id) => {
      let ing = getIngredient(ingredients, id);
      total += ing.price;
      if (!ingredientsList[id]) {
        ingredientsList[id] = {...ing, amount: 1};
      } else {
        ingredientsList[id].amount += 1;
      }
    });
    return {
      ...order,
      total,
      ingredientsList,
    };
  }
  return inititalOrder;
}
