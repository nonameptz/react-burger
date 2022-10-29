import React, {FunctionComponent, MouseEventHandler} from "react";
import ingredientStyles from './ingredient.module.css';
import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

interface IngredientProps {
  type: string,
  counter: number,
  name: string,
  image: string,
  price: number,
  index: number,
  onClick: MouseEventHandler,
}

const Ingredient: FunctionComponent<IngredientProps> = (
  {type, counter, name, image, price, index, onClick}
  ) => {
  const [, dragRef] = useDrag({
    type,
    item: {index, type}
  });
  return (
    <div className={`flex ${ingredientStyles.ingredient} mb-10 ${index % 2 === 0 ? 'mr-6' : ''}`}
         ref={dragRef}
         data-testid={`draggable_element_${type}_${index}`}
         onClick={onClick}>
      {counter > 0 && (<Counter count={counter} size="default" />)}
      <img src={image} alt={name} className={ingredientStyles.ingredientImage} />
      <div className={`mt-1 flex ${ingredientStyles.ingredientPrice}`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className='mt-1 text text_type_main-default'>{name}</p>
    </div>
  );
}
export default Ingredient;
