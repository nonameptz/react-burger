import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import {string, arrayOf} from "prop-types";
import {ingredientType} from "../../../utils/types";
import { selectIngredient } from '../../../services/reducers/burger';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

const IngredientList = ({title, list, type}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const onIngredientClick = (ingredient) => {
    dispatch(selectIngredient({id: ingredient._id} ))
    history.push({
      pathname: '/ingredients/' + ingredient._id,
      state: { background: location }
    });
  }

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
