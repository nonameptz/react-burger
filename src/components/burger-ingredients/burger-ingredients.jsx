import React from 'react';
import './burger-ingredients.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
const BurgerIngredients = ({buns, mains, sauces}) => {
  const [current, setCurrent] = React.useState('one')
  return (
    <section className='burger-ingredients-container pt-10'>
      <header className='text text_type_main-large mb-5'>Собереите бургер</header>
      <div style={{display: 'flex'}} className='mb-10'>
        <Tab value="one" active={current === 'one'}
             onClick={setCurrent}>Булки</Tab>
        <Tab value="two" active={current === 'two'}
             onClick={setCurrent}>Соусы</Tab>
        <Tab value="three" active={current === 'three'}
             onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className='burger-ingredients-main-list scroll'>
        <IngredientList title='Булки' list={buns} />
        <IngredientList title='Соусы' list={sauces} />
        <IngredientList title='Начинки' list={mains} />
      </div>
    </section>
  );
}
export default BurgerIngredients;
