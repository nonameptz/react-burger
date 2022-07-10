import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientContext from '../../services/ingredientContext';
import API_DOMAIN from "../../constants/apiConstant";

const App = () => {
  const [ingredients, setIngredients] = useState({buns: [], mains: [], sauces: []});
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_DOMAIN}api/ingredients`)
      .then((data) => data.json())
      .then(({data}) => {
        setIngredients({
          buns: data.filter(food => food.type === 'bun'),
          mains: data.filter(food => food.type === 'main'),
          sauces: data.filter(food => food.type === 'sauce'),
        });
      })
      .catch(error => {
        setError(error);
      })
  }, [])

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <div className={appStyles.mainContent}>
        {error && (
          <code>
            <p>Упс! Произошла ошибочка.. Вот ее текст:</p>
            <p>{error.toString()}</p>
          </code>
        )}
        {!error && (
          <IngredientContext.Provider value={{ingredients}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientContext.Provider>
        )}
      </div>
    </div>
  );
}

export default App;
