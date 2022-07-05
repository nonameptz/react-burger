import React, {useState} from "react";
import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

const IngredientList = ({title, list}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState({});

  const onIngredientClick = (index) => {
    setModalVisible(true);
    setActiveIngredient(list[index]);
  }

  const onCloseModal = () => {
    setModalVisible(false);
    setActiveIngredient({});
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
  title: PropTypes.string,
  list: PropTypes.array
};

export default IngredientList;
