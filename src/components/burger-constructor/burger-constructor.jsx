import React, {useState} from 'react';
import {arrayOf} from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ingredientType} from "../../utils/types";

const BurgerConstructor = ({ constructor }) => {
  const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
  const [isModalVisible, setIsModalVisible] = useState(false);
  let totalPrice = 0;

  const onOrderClick = () => {
    setIsModalVisible(true);
  }

  const onCloseModal = () => {
    setIsModalVisible(false);
  }

  const modal = (
    <Modal onClose={onCloseModal}>
      <OrderDetails orderId={'034536'} />
    </Modal>
  );

  return (
    <section className={`mt-25 mb-10 ml-10 pl-4 pr-4 flex ${burgerConstructorStyles.burgerConstructor}`}>
      <div className='ml-8'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
      </div>
      <div className={`flex ${burgerConstructorStyles.constructorList} scroll`}>
        {constructor.map(element => {
          totalPrice +=element.price;
          return (
            <div className={`flex pl-2 ${burgerConstructorStyles.constructorElement}`}
                 key={element._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image_mobile}
              />
            </div>
          );
        }
        )}
      </div>
      <div className='ml-8'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        />
      </div>
      <div className={`mt-10 pr-4 flex ${burgerConstructorStyles.burgerConstructorFooter}`}>
        <p className={`text text_type_digits-medium ${burgerConstructorStyles.burgerConstructorTotal}`}>
          {(200 + totalPrice + 200)}
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {isModalVisible && modal}
    </section>
  );
}

BurgerConstructor.propTypes = {
  constructor: arrayOf(ingredientType).isRequired
};

export default BurgerConstructor;
