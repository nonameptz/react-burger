import React from 'react';
const IngredientContext = React.createContext({
  ingredients: {
    buns: [],
    sauces: [],
    mains: [],
  }
});

export default IngredientContext;
