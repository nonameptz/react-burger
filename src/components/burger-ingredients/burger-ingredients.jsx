import { useState, useContext} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
import IngredientContext from '../../services/ingredientContext';

const BurgerIngredients = () => {
  const {ingredients} = useContext(IngredientContext);
  const [current, setCurrent] = useState('one')
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
        <IngredientList title='Булки' list={ingredients.buns} />
        <IngredientList title='Соусы' list={ingredients.sauces} />
        <IngredientList title='Начинки' list={ingredients.mains} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
