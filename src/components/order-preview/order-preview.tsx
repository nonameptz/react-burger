import orderPreviewStyles from "./order-preview.module.css";
import {useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import {
  IBurgerStore,
  IRootStore,
  TOrderPreview
} from "../../types/store";
import {getIngredient} from "../../utils/getIngredient";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderPreviewProps {
  urlPrefix: string
  order: TOrderPreview
}

const OrderPreview:FC<IOrderPreviewProps> = ({urlPrefix, order}) => {
  const history = useHistory();
  const location = useLocation();
  const {ingredients: ingredientsList, isLoaded} = useSelector<IRootStore, IBurgerStore>(store => store.burger);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [moreIngredients, setMoreIngredients] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(0);
    let tempTotal = 0
    setIngredients(order.ingredients.map(id => {
      let ing = getIngredient(ingredientsList, id);
      tempTotal += ing.price
      return ing.image_mobile || ing.image;
    }));
    setTotalPrice(tempTotal);
  }, [order.ingredients])
  if (ingredients.length > 6) {
    setMoreIngredients(ingredients.length - 6);
    setIngredients(ingredients.slice(0, 6))
  }
  const onFeedClick = (feedId:number):void => {
    history.push({
      pathname: urlPrefix + feedId,
      state: { background: location }
    });
  }
  const date = new Date(order.createdAt).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
    hour: '2-digit',
    minute: '2-digit'
  })

  if (!isLoaded) {
    return null;
  }

  return (
    <div className={`${orderPreviewStyles.order} flex`} onClick={() => onFeedClick(order.number)}>
      <div className={`${orderPreviewStyles.header} flex mb-6`}>
        <p className="text text_type_digits-default">
          #{order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">
        {order.name}
      </p>
      <div className={`${orderPreviewStyles.infoBox} flex`}>
        <div className={orderPreviewStyles.ingredientPreviewList}>
          {ingredients.length && ingredients.map((ingSrc, index) => {
            const showMore = moreIngredients > 0 && (index === ingredients.length - 1);
            return (
              <div className={orderPreviewStyles.ingredientPreview}
                   style={{zIndex: 10 - index, left: 57 * index}}
                   key={index}
              >
                <img src={ingSrc} alt={ingSrc} className={`${orderPreviewStyles.ingredientPreviewImg}`} style={{opacity: showMore ? 0.5 : 1}} />
                {showMore && (
                  <span className={`${orderPreviewStyles.moreIngredients} text text_type_digits-default`}>+{moreIngredients}</span>
                )}
              </div>
            )
          })}
        </div>
        <p className={`text text_type_digits-medium ${orderPreviewStyles.burgerConstructorTotal}`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  )
}

export default OrderPreview;
