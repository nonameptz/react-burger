import ingredientPreviewStyles from "./ingredient-preview.module.css";
import React, {FC} from "react";
import { IIngredient } from "../../types/store";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IIngredientPreviewProps {
  ingData: IIngredient & {
    amount?: number;
  }
}

const IngredientPreview:FC<IIngredientPreviewProps> = ({ingData}) => {
  return (
    <div className={`${ingredientPreviewStyles.ingredient} flex mb-4`}>
      <div className={`${ingredientPreviewStyles.leftPanel} flex`}>
        <div className={`${ingredientPreviewStyles.ingredientPreview}`}>
          <img src={ingData.image_mobile}
               alt={ingData.name}
               className={`${ingredientPreviewStyles.ingredientPreviewImg}`}
          />
        </div>
        <p className='ml-4 text text_type_main-default'>{ingData.name}</p>
      </div>
      <div className={`mr-6 text text_type_digits-default flex ${ingredientPreviewStyles.totalPrice}`}>
        {`${ingData.amount} x ${ingData.price}`}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default IngredientPreview;
