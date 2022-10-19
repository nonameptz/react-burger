import ingredientPreviewStyles from "./ingredient-preview.module.css";
import {useSelector} from "react-redux";
import React, {FC, useEffect, useState} from "react";
import {
  IBurgerStore,
  IRootStore,
} from "../../types/store";
import {getIngredient} from "../../utils/getIngredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {initSelectedIngredientState} from "../../utils/initStates";

interface IIngredientPreviewProps {
  id: string
}

const IngredientPreview:FC<IIngredientPreviewProps> = ({id}) => {
  const { ingredients } = useSelector<IRootStore, IBurgerStore>(store => store.burger);
  const [ingredient, setIngredient] = useState(initSelectedIngredientState);
  useEffect(() => {
    setIngredient(getIngredient(ingredients, id));
  }, [])
  return (
    <div className={`${ingredientPreviewStyles.ingredient} flex mb-4`}>
      <div className={`${ingredientPreviewStyles.leftPanel} flex`}>
        <div className={`${ingredientPreviewStyles.ingredientPreview}`}>
          <img src={ingredient.image_mobile}
               alt={ingredient.name}
               className={`${ingredientPreviewStyles.ingredientPreviewImg}`}
          />
        </div>
        <p className='ml-4 text text_type_main-default'>{ingredient.name}</p>
      </div>
      <div className={`mr-6 text text_type_digits-default flex ${ingredientPreviewStyles.totalPrice}`}>
        {`1 x ${ingredient.price}`}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default IngredientPreview;
