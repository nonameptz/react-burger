import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";

/**
 * Нет типизации по той причине, что как только я меняю файл на *.tsx получаю
 * такую ошибку (компонент Tab):
 * https://practicum-students.slack.com/archives/C03KGRWCU64/p1656087733647409
 * Anna Chernoskutova в треде сказала чтобы я использовал jsx тут.
 */

const BurgerIngredients = ({buns, mains, sauces}) => {
  const [current, setCurrent] = React.useState('one')
  return (
    <section className={`${burgerIngredientsStyles.burgerIngredientsContainer} pt-10`}>
      <h2 className='text text_type_main-large mb-5'>Собереите бургер</h2>
      <div className='mb-10 flex'>
        <Tab value="one" active={current === 'one'}
             onClick={setCurrent}>Булки</Tab>
        <Tab value="two" active={current === 'two'}
             onClick={setCurrent}>Соусы</Tab>
        <Tab value="three" active={current === 'three'}
             onClick={setCurrent}>Начинки</Tab>
      </div>
      <div className={`${burgerIngredientsStyles.burgerIngredientsMainList} scroll`}>
        <IngredientList title='Булки' list={buns} />
        <IngredientList title='Соусы' list={sauces} />
        <IngredientList title='Начинки' list={mains} />
      </div>
    </section>
  );
}
export default BurgerIngredients;
