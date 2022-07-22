import {useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchBurgers } from '../../services/reducers/burger';
import {useDispatch, useSelector} from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const { isError, isLoading, errorMsg } = useSelector(store => store.burger);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBurgers());
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <div className={appStyles.mainContent}>
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
    </div>
  );
}

export default App;
