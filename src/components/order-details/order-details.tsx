import orderDetailsStyles from "./order-details.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from '../../types/dispatch';
import {FC} from "react";

const OrderDetails:FC = () => {
  const orderNum = useSelector(store => store.burger.orderNum);
  return (
    <div className={`${orderDetailsStyles.order} flex`}
         data-testid='order-modal'>
      <p className="text text_type_digits-large mt-10" data-testid='order-num'>{orderNum}</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyles.check} >
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-medium mt-15" data-testid='order-text'>Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;
