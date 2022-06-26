import React, { FunctionComponent } from "react";
import './ingredient.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientProps {
  name: string,
  image: string,
  price: number,
  index: number,
}

const Ingredient: FunctionComponent<IngredientProps> = ({name, image, price, index}) => {
  return (
    <div className={`flex ingredient mb-10 ${index % 2 === 0 ? 'mr-6' : ''}`}>
      <img src={image} className='ingredient-image' />
      <div className='mt-1 flex ingredient-price'>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className='mt-1 text text_type_main-default'>{name}</p>
    </div>
  );
}
export default Ingredient;
