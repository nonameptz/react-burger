import {FC, useState} from 'react';
import {
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../button/button";
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useSelector, useDispatch} from '../../types/dispatch';
import { addBun, addIngredient, removeIngredient, setOrder } from '../../services/reducers/burger';
import {useDrop} from "react-dnd";
import SortableConstructorElement from "./sortable-constructor-element";
import {useHistory} from "react-router-dom";
import {IIngredient} from "../../types/store";

interface DragItem {
  index: number
  id: string
  type: string
}

const BurgerConstructor:FC = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {
    ingredients,
    constructorList,
    constructorBun,
    totalPrice,
    orderLoading
  } = useSelector(store => store.burger);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [, dropBunTarget] = useDrop<
    DragItem,
    void
  >({
    accept: 'buns',
    drop({index, type}) {
      dispatch(addBun(ingredients[type][index]));
    },
  });

  const [, dropIngredientTarget] = useDrop<
    DragItem,
    void
  >({
    accept: ['sauces', 'mains'],
    drop({index, type}) {
      dispatch(addIngredient(ingredients[type][index]));
    },
  });

  const onDelete = (index:number):void => {
    dispatch(removeIngredient(index));
  }

  const onOrderClick = async () => {
    if (isLoggedIn) {
      const ingredients = [constructorBun, ...constructorList, constructorBun]
        .map((current) => current["_id"])
      dispatch(setOrder(ingredients));
      setIsModalVisible(true);
    } else {
      history.push({
        pathname: '/login',
      });
    }
  }

  const onCloseModal = () => {
    setIsModalVisible(false);
  }

  const modal = (
    <Modal onClose={onCloseModal}>
      <OrderDetails />
    </Modal>
  );

  const getMissedText = () => {
    const output = [];
    if (!constructorBun.name) {
      output.push('булку');
    }
    if (!constructorList.length) {
      output.push('ингредиенты');
    }
    return output.join(' и ');
  }

  return (
    <section className={`mt-25 mb-10 ml-10 pl-4 pr-4 flex ${burgerConstructorStyles.burgerConstructor}`}>
      <div ref={dropBunTarget} data-testid='drop_area_bun'>
        <div ref={dropIngredientTarget} data-testid='drop_area_ingredients'>
            <div className='ml-8'>
              {constructorBun.name && (<ConstructorElement
                type="top"
                isLocked
                text={`${constructorBun.name} (верх)`}
                price={constructorBun.price}
                thumbnail={constructorBun.image_mobile}
              />)}
            </div>
            <div className={`flex ${burgerConstructorStyles.constructorList} scroll mt-3 mb-3`}>
              {constructorList.map((element:IIngredient, index) => {
                return (
                  <SortableConstructorElement
                    element={element}
                    index={index}
                    onDelete={() => onDelete(index)}
                    key={element.uuid}
                  />
                )}
              )}
            </div>
            {(!constructorBun.name || !constructorList.length) && (
              <div className='text text_type_main-small ml-15 mt-4 mb-7'>
                Пожалуйста, перенесите сюда {getMissedText()} для создания заказа.
              </div>
            )}
            <div className='ml-8'>
              {constructorBun.name && (<ConstructorElement
                type="bottom"
                isLocked
                text={`${constructorBun.name} (низ)`}
                price={constructorBun.price}
                thumbnail={constructorBun.image_mobile}
              />)}
            </div>
          </div>
        </div>
        <div className={`mt-10 pr-4 flex ${burgerConstructorStyles.burgerConstructorFooter}`}>
          <p className={`text text_type_digits-medium ${burgerConstructorStyles.burgerConstructorTotal}`}>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
          <div data-testid='button-order-burger'>
            <Button
              type="primary"
              size="large"
              onClick={onOrderClick}
              disabled={(!constructorBun.name || orderLoading)}>
              {orderLoading ? 'Оформляем...' : 'Оформить заказ'}
            </Button>
          </div>
        </div>
        {isModalVisible && !orderLoading && modal}
    </section>
  );
}

export default BurgerConstructor;
