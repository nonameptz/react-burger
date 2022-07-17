import {useState, useEffect } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useSelector, useDispatch} from "react-redux";
import { addBun, addIngredient, removeIngredient, setOrder } from '../../services/reducers/burger';
import {useDrop} from "react-dnd";
import SortableConstructorElement from "./sortable-constructor-element";

const BurgerConstructor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { ingredients, constructorList, constructorBun, totalPrice } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  const [, dropBunTopTarget] = useDrop({
    accept: 'buns',
    drop({index, type}) {
      dispatch(addBun(ingredients[type][index]));
    },
  });

  const [, dropBunBottomTarget] = useDrop({
    accept: 'buns',
    drop({index, type}) {
      dispatch(addBun(ingredients[type][index]));
    },
  });

  const [, dropIngredientTarget] = useDrop({
    accept: ['sauces', 'mains'],
    drop({index, type}) {
      dispatch(addIngredient(ingredients[type][index]));
    },
  });

  useEffect(() => {
    if (ingredients.buns.length && constructorList.length === 0) {
      dispatch(addBun(ingredients.buns[0]))
    }
  }, []);

  const onDelete = (index) => {
    dispatch(removeIngredient(index));
  }

  const onOrderClick = async () => {
    const ingredients = [constructorBun, ...constructorList, constructorBun]
      .map((current) => current["_id"])
    dispatch(setOrder(ingredients));
    setIsModalVisible(true);
  }

  const onCloseModal = () => {
    setIsModalVisible(false);
  }

  const modal = (
    <Modal onClose={onCloseModal}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={`mt-25 mb-10 ml-10 pl-4 pr-4 flex ${burgerConstructorStyles.burgerConstructor}`}>
      {constructorList && constructorBun.name &&
        (<>
          <div className='ml-8'
               ref={dropBunTopTarget}>
            <ConstructorElement
              type="top"
              isLocked
              text={`${constructorBun.name} (верх)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image_mobile}
            />
          </div>
          <div className={`flex ${burgerConstructorStyles.constructorList} scroll`}
               ref={dropIngredientTarget}>
            {constructorList.map((element, index) => {
              return (
                <SortableConstructorElement
                  element={element}
                  index={index}
                  onDelete={() => onDelete(index)}
                  key={element._id + '-' + index}
                />
              )}
            )}
            {!constructorList.length && (
              <span className='text text_type_main-small ml-15 mt-7 mb-7'>Перетащите сюда ингредиенты, просто булку есть вредно!</span>
            )}
          </div>
          <div className='ml-8'
               ref={dropBunBottomTarget}>
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${constructorBun.name} (низ)`}
              price={constructorBun.price}
              thumbnail={constructorBun.image_mobile}
            />
          </div>
        </>
      )}
        <div className={`mt-10 pr-4 flex ${burgerConstructorStyles.burgerConstructorFooter}`}>
          <p className={`text text_type_digits-medium ${burgerConstructorStyles.burgerConstructorTotal}`}>
            {totalPrice}
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

export default BurgerConstructor;
