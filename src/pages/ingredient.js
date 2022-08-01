import IngredientDetails
  from "../components/ingredient-details/ingredient-details";
import ingredientStyles from './ingredient.module.css';

export const IngredientPage = () => {
  return (
    <div className={`d-flex ${ingredientStyles.ingredientStandalone}`}>
      <IngredientDetails />
    </div>
  );
}
