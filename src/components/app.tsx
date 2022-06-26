import React from 'react';
import './app.css';
import AppHeader from './app-header/app-header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';

import data from '../data/data';

function App() {
  const buns = data.filter(food => food.type === 'bun');
  const mains = data.filter(food => food.type === 'main');
  const sauces = data.filter(food => food.type === 'sauce');

  const constructor = data.slice(0, 7);

  return (
    <div className="app">
      <AppHeader />
      <div className="main-content">
        <BurgerIngredients buns={buns} mains={mains} sauces={sauces} />
        <BurgerConstructor constructor={constructor} />
      </div>
    </div>
  );
}

export default App;
