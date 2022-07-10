import React, {useState, useReducer, useContext, useEffect} from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientContext from "../../services/ingredientContext";
import ConstructorContext from "../../services/constructorContext";
import API_DOMAIN from "../../constants/apiConstant";
import checkResponse from "../../utils/checkResponse";

const BurgerConstructor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {ingredients} = useContext(IngredientContext);

  function reducer(state, action) {
    let total = state.total || 0;
    switch (action.type) {
      case "add_bun":
        total += action.payload.price * 2;
        return { ...state, bun: {...action.payload, is_locked: true}, total };
      case "add_ingredient":
        total += action.payload.price;
        return { ...state, list: [...state.list, action.payload], total };
      case "set_order":
        return {
          ...state,
          order_num: action.payload,
        }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  const [constructor, dispatch] = useReducer(reducer, { bun: {}, list: [], total: 0, order_num: null });

  useEffect(() => {
    if (ingredients.buns.length && constructor.list.length === 0) {
      dispatch({type: "add_bun", payload: ingredients.buns[0]})
      dispatch({type: "add_ingredient", payload: ingredients.sauces[2]})
      dispatch({type: "add_ingredient", payload: ingredients.mains[2]})
      dispatch({type: "add_ingredient", payload: ingredients.sauces[3]})
      dispatch({type: "add_ingredient", payload: ingredients.mains[3]})
      dispatch({type: "add_ingredient", payload: ingredients.mains[5]})
      dispatch({type: "add_ingredient", payload: ingredients.sauces[1]})
      dispatch({type: "add_ingredient", payload: ingredients.mains[0]})
    }
  }, [ingredients]);


  const onOrderClick = async () => {
    const ingredients = [constructor.bun, ...constructor.list, constructor.bun]
      .map((current) => current["_id"])
    await fetch(`${API_DOMAIN}api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients})
    })
      .then(checkResponse)
      .then(data => dispatch({type: "set_order", payload: data.order.number}))
      .catch(error => {
        console.error('there was an error', error);
      })
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
      <ConstructorContext.Provider value={{ constructor, dispatch }}>
      {constructor.list && constructor.bun &&
        (<>
          <div className='ml-8'>
            <ConstructorElement
              type="top"
              isLocked={constructor.bun.is_locked}
              text={`${constructor.bun.name} (верх)`}
              price={constructor.bun.price}
              thumbnail={constructor.bun.image_mobile}
            />
          </div>
          <div className={`flex ${burgerConstructorStyles.constructorList} scroll`}>
            {constructor.list.map(element => {
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
              )}
            )}
          </div>
          <div className='ml-8'>
            <ConstructorElement
              type="bottom"
              isLocked={constructor.bun.is_locked}
              text={`${constructor.bun.name} (низ)`}
              price={constructor.bun.price}
              thumbnail={constructor.bun.image_mobile}
            />
          </div>
        </>
      )}
        <div className={`mt-10 pr-4 flex ${burgerConstructorStyles.burgerConstructorFooter}`}>
          <p className={`text text_type_digits-medium ${burgerConstructorStyles.burgerConstructorTotal}`}>
            {constructor.total}
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={onOrderClick}>
            Оформить заказ
          </Button>
        </div>
        {isModalVisible && modal}
      </ConstructorContext.Provider>
    </section>
  );
}

export default BurgerConstructor;
