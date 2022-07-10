import React, {useState} from "react";
import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import {string, arrayOf} from "prop-types";
import {ingredientType} from "../../../utils/types";

const IngredientList = ({title, list}) => {
  const initActiveState = {
    image_mobile: '',
    image_large: '',
    name: '',
    price: 0,
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState(initActiveState);

  const onIngredientClick = (index) => {
    setModalVisible(true);
    setActiveIngredient(list[index]);
  }

  const onCloseModal = () => {
    setModalVisible(false);
    setActiveIngredient(initActiveState);
  }

  const modal = (
    <Modal header='Детали ингредиента' onClose={onCloseModal}>
      <IngredientDetails ingredient={activeIngredient} />
    </Modal>
  );

  return (
    <>
      <h3 className={`mb-6 ${ingredientListStyles.burgerIngredientsTitle}`}>{title}</h3>
      <section className={`flex ${ingredientListStyles.burgerIngredientsSection}`}>
        {list.map((ing, index) =>
          (<Ingredient name={ing.name}
                       image={ing.image}
                       price={ing.price}
                       key={ing._id}
                       index={index}
                       onClick={() => onIngredientClick(index)}
          />)
        )}
        {modalVisible && modal}
      </section>
    </>
  );
}

IngredientList.propTypes = {
  title: string.isRequired,
  list: arrayOf(ingredientType).isRequired,
};

export default IngredientList;
