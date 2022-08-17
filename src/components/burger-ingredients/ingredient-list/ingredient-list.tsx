import ingredientListStyles from './ingredient-list.module.css';
import Ingredient from "../ingredient/ingredient";
import { selectIngredient } from '../../../services/reducers/burger';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {IIngredient} from "../../../types/store";
import {FC} from "react";

interface IIngredientList {
  title: string;
  list: Array<IIngredient>;
  type: string;
}

const IngredientList:FC<IIngredientList> = ({title, list, type}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const onIngredientClick = (ingredient:IIngredient):void => {
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

export default IngredientList;
