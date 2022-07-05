import React, {FunctionComponent, MouseEventHandler} from "react";
import ingredientStyles from './ingredient.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientProps {
  name: string,
  image: string,
  price: number,
  index: number,
  onClick: MouseEventHandler,
}

const Ingredient: FunctionComponent<IngredientProps> = (
  {name, image, price, index, onClick}
  ) => {
  return (
    <div className={`flex ${ingredientStyles.ingredient} mb-10 ${index % 2 === 0 ? 'mr-6' : ''}`}
         onClick={onClick}>
      <img src={image} className={ingredientStyles.ingredientImage} />
      <div className={`mt-1 flex ${ingredientStyles.ingredientPrice}`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className='mt-1 text text_type_main-default'>{name}</p>
    </div>
  );
}
export default Ingredient;
