import React from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-constructor.css';
class BurgerConstructor extends React.Component {
  render() {
    const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
    let totalPrice = 0;
    return (
      <section
        className='mt-25 mb-10 ml-10 pl-4 pr-4'
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: 'fit-content' }}>
        <div className='ml-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className='ml-8 flex constructor-list scroll'>
          {this.props.constructor.map(element => {
            totalPrice +=element.price;
            return (<ConstructorElement
              key={element._id}
              text={element.name}
              price={element.price}
              thumbnail={element.image_mobile}
            />)
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
        <div className='mt-10 pr-4 flex' style={{flexDirection: 'row', justifyContent: 'end'}}>
          <p className="text text_type_digits-medium" style={{ margin: 'auto 40px auto'}}>
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