import React, {useState} from "react";
import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import {string, arrayOf} from "prop-types";
import {ingredientType} from "../../../utils/types";
import { selectIngredient, unselectIngredient } from '../../../services/reducers/burger';
import {useDispatch} from "react-redux";

const IngredientList = ({title, list, type}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onIngredientClick = (ingredient) => {
    setModalVisible(true);
    dispatch(selectIngredient(ingredient))
  }

  const onCloseModal = () => {
    setModalVisible(false);
    dispatch(unselectIngredient())
  }

  const modal = (
    <Modal header='Детали ингредиента' onClose={onCloseModal}>
      <IngredientDetails />
    </Modal>
  );

  return (
    <>
      <h3 className={`mb-6 ${ingredientListStyles.burgerIngredientsTitle}`}>{title}</h3>
      <section className={`flex ${ingredientListStyles.burgerIngredientsSection}`}>
        {list.map((ingredient, index) =>
          (<Ingredient type={type}
                       counter={ingredient.counter}
                       name={ingredient.name}
                       image={ingredient.image}
                       price={ingredient.price}
                       key={ingredient._id}
                       index={index}
                       onClick={() => onIngredientClick(ingredient)}
          />)
        )}
        {modalVisible && modal}
      </section>
    </>
  );
}

IngredientList.propTypes = {
  title: string.isRequired,
  type: string.isRequired,
  list: arrayOf(ingredientType).isRequired,
};

export default IngredientList;
