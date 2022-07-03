import React from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';

/**
 * Нет типизации по той причине, что как только я меняю файл на *.tsx получаю
 * такую ошибку (компонент Button):
 * https://practicum-students.slack.com/archives/C03KGRWCU64/p1656087733647409
 * Anna Chernoskutova в треде сказала чтобы я использовал jsx тут.
 */

class BurgerConstructor extends React.Component {
  render() {
    const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
    let totalPrice = 0;
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
          {this.props.constructor.map(element => {
            totalPrice +=element.price;
            return (
              <div className={`flex pl-2 ${burgerConstructorStyles.constructorElement}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  key={element._id}
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
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
