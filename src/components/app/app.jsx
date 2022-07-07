import React, {useEffect, useState} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const API_DOMAIN = 'https://norma.nomoreparties.space/';

const App = () => {
  const [buns, setBuns] = useState([]);
  const [mains, setMains] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [constructorData, setConstructorData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_DOMAIN}api/ingredients`)
      .then((data) => data.json())
      .then(({data}) => {
        setBuns(data.filter(food => food.type === 'bun'));
        setMains(data.filter(food => food.type === 'main'));
        setSauces(data.filter(food => food.type === 'sauce'));
        setConstructorData(data.slice(2, 9).sort(() => 0.5 - Math.random())); //shuffle for fun
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
          <>
            <BurgerIngredients buns={buns} mains={mains} sauces={sauces} />
            <BurgerConstructor constructor={constructorData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
