import {TOrderPreview} from "../types/store";
import {inititalOrder} from "./initStates";

export const getOrder = (orders:Array<TOrderPreview>, id:number):TOrderPreview => {
  const ingredient = orders.find(order => order.number === id);
  if (ingredient) {
    return ingredient;
  }
  return inititalOrder;
}
