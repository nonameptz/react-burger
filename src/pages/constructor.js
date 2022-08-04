import {useSelector} from "react-redux";
import burgerWrapperStyles from "./constructor.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients
  from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor
  from "../components/burger-constructor/burger-constructor";

export const ConstructorPage = () => {
  const { isError, isLoading, errorMsg } = useSelector(store => store.burger);

  return (
    <div className={burgerWrapperStyles.mainContent}>
      {isLoading && (
        <span>Загружаем ингредиенты! Немножечко терпения!</span>
      )}
      {isError && (
        <code>
          <p>Упс! Произошла ошибочка.. Вот ее текст:</p>
          <p>{errorMsg}</p>
        </code>
      )}
      {!isError && !isLoading && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </div>
  );
};