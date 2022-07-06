import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
import { arrayOf } from "prop-types";
import { ingredientType } from '../../utils/types'

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

BurgerIngredients.propTypes = {
  buns: arrayOf(ingredientType).isRequired,
  mains: arrayOf(ingredientType).isRequired,
  sauces: arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
