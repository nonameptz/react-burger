import React  from "react";
import './ingredient-list.css';
import Ingredient from "../ingredient/ingredient";

const IngredientList = ({title, list}) => {
  return (
    <>
      <h3 style={{ marginTop: 0 }} className='mb-6'>{title}</h3>
      <section className='flex burger-ingredients-section'>
        {list.map((ing, index) =>
          (<Ingredient name={ing.name}
                       image={ing.image}
                       price={ing.price}
                       key={ing._id}
                       index={index}
          />)
        )}
      </section>
    </>
  );
}

export default IngredientList;
