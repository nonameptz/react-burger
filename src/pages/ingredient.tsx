import IngredientDetails
  from "../components/ingredient-details/ingredient-details";
import ingredientStyles from './ingredient.module.css';
import {FC} from "react";

export const IngredientPage:FC = () => {
  return (
    <div className={`d-flex ${ingredientStyles.ingredientStandalone}`}>
      <IngredientDetails />
    </div>
  );
}
