import React, {useState, useEffect, FC} from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab as TabUI } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredient-list/ingredient-list";
import { useSelector } from '../../types/dispatch';

const Tab: React.FC<{
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}> = TabUI;

const BurgerIngredients:FC = () => {
  const ingredients = useSelector(store => store.burger.ingredients);
  const [currentTab, setCurrentTab] = useState<string>('one');
  const [offsets, setOffsets] = useState<number[]>([]);

  const calculateOffsets = ():void => {
    const offs:number[] = [...document.querySelectorAll<HTMLHeadingElement>('.scroll h3')]
      .map((cur:HTMLHeadingElement) => cur.offsetTop)
      .map((cur, _, arr) => cur - arr[0]);
    setOffsets(offs);
  }

  useEffect(() => {
    calculateOffsets();
  }, [ingredients])

  useEffect(() => {
    // it doesn't make much sense right now, but if we will change layout
    // and there will be another amount of ingredients in a row
    // we have to recalculate offsets
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
  }, [])

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const curScroll = (e.target as HTMLElement).scrollTop;
    if (curScroll < offsets[1]) {
      setCurrentTab('0');
    } else if (curScroll >= offsets[1] && curScroll < offsets[2]) {
      setCurrentTab('1');
    } else if (curScroll >= offsets[2]) {
      setCurrentTab('2');
    }
  }

  const onTabClick = (value:string) => {
    let el = document.querySelectorAll<HTMLHeadingElement>('.scroll h3')[+value];
    el.scrollIntoView({behavior: "smooth"});
  }

  return (
    <section className={`${burgerIngredientsStyles.burgerIngredientsContainer} pt-10`}>
      <h2 className='text text_type_main-large mb-5'>Собереите бургер</h2>
      <div className='mb-10 flex'>
        <Tab value="0" active={currentTab === '0'}
             onClick={onTabClick}>Булки</Tab>
        <Tab value="1" active={currentTab === '1'}
             onClick={onTabClick}>Соусы</Tab>
        <Tab value="2" active={currentTab === '2'}
             onClick={onTabClick}>Начинки</Tab>
      </div>
      <div className={`${burgerIngredientsStyles.burgerIngredientsMainList} scroll`} onScroll={onScroll}>
        <IngredientList title='Булки' type='buns' list={ingredients.buns} />
        <IngredientList title='Соусы' type='sauces' list={ingredients.sauces} />
        <IngredientList title='Начинки' type='mains' list={ingredients.mains} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
