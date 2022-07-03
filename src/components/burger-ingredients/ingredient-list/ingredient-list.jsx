import React  from "react";
import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";

const IngredientList = ({title, list}) => {
  return (
    <>
      <h3 className={`mb-6 ${ingredientListStyles.burgerIngredientsTitle}`}>{title}</h3>
      <section className={`flex ${ingredientListStyles.burgerIngredientsSection}`}>
        {list.map((ing, index) =>
          (<Ingredient name={ing.name}
                       image={ing.image}
                       price={ing.price}
                       key={ing._id}
                       index={index}
          />)
        )}
      </section>
    </>
  );
}

export default IngredientList;
