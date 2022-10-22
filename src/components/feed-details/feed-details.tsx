import feedDetailsStyles from "./feed-details.module.css";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React, {FC} from "react";
import {
  IBurgerStore,
  IOrdersStore,
  IRootStore
} from "../../types/store";
import {getOrder} from "../../utils/getOrder";
import IngredientPreview from "../ingredient-preview/ingredient-preview";
import ingredientPreviewStyles
  from "../ingredient-preview/ingredient-preview.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TFeedParams = {
  id: string;
};
type TFeedProps = {
  isPrivate: boolean;
};

const FeedDetails:FC<TFeedProps> = ({isPrivate = false}) => {
  const { id } = useParams<TFeedParams>();
  const { allOrderList, orderList } = useSelector<IRootStore, IOrdersStore>(store => store.orders);
  const {ingredients} = useSelector<IRootStore, IBurgerStore>(store => store.burger);

  console.log(allOrderList, orderList);

  const order = getOrder(isPrivate ? orderList : allOrderList, +id, ingredients);
  const date = new Date(order.createdAt).toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
    hour: '2-digit',
    minute: '2-digit'
  })
  return (
    <div className={`${feedDetailsStyles.order} flex`}>
      <p className="text text_type_main-medium mt-10 mb-3">
        {order.name}
      </p>
      <div className={`${feedDetailsStyles.status} text text_type_main-default`}>
        {order.status === 'done' ? 'Выполнен' : 'В процессе'}
      </div>
      <h3 className="text text_type_main-medium mt-15 mb-6">
        Состав:
      </h3>
      <div className={`${feedDetailsStyles.ordersList} scroll`}>
        {[...new Set(order.ingredients)].map((id, index) => (
          <IngredientPreview key={index} ingData={order.ingredientsList[id]} />
        ))}
      </div>
      <div className={`${feedDetailsStyles.footer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
        <div className={`text text_type_digits-default flex ${ingredientPreviewStyles.totalPrice}`}>
          {order.total}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default FeedDetails;
