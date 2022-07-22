import ingredientDetailsStyles from "./ingredient-details.module.css";
import {useSelector} from "react-redux";

const IngredientDetails = () => {
  const ingredient = useSelector(store => store.burger.selectedIngredient);
  return (
    <div className={`${ingredientDetailsStyles.order} flex`}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4">
        {ingredient.name}
      </p>
      <div className={`${ingredientDetailsStyles.consist} flex mt-8`}>
        <div className={`${ingredientDetailsStyles.box} text text_type_main-default text_color_inactive mr-5`}>
          Калории, ккал
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={`${ingredientDetailsStyles.box} text text_type_main-default text_color_inactive mr-5`}>
          Белки, г
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className={`${ingredientDetailsStyles.box} text text_type_main-default text_color_inactive mr-5`}>
          Жиры, г
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={`${ingredientDetailsStyles.box} text text_type_main-default text_color_inactive`}>
          Углеводы, г
          <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
