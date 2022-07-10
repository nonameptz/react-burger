import orderDetailsStyles from "./order-details.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useContext} from "react";
import ConstructorContext from "../../services/constructorContext";

const OrderDetails = () => {
  const { constructor } = useContext(ConstructorContext);
  return (
    <div className={`${orderDetailsStyles.order} flex`}>
      <p className="text text_type_digits-large mt-10">{constructor.order_num}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyles.check} >
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-medium mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;
