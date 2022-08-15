import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import NavButton from "./nav-button/nav-button";
import {useHistory, useRouteMatch} from "react-router-dom";

const AppHeader = () => {
  const history = useHistory();
  const rootMatch = useRouteMatch({
    path: "/",
    strict: true
  });
  const isConstructorPage = rootMatch?.isExact || false;
  const isProfilePage = !!useRouteMatch("/profile");
  const onConstructorClick = () => {
    history.replace({pathname: '/'});
  }
  const onProfileClick = () => {
    history.replace({pathname: '/profile'});
  }
  return (
    <header className={`${appHeaderStyles.header} p-4`}>
      <nav className={appHeaderStyles.width33}>
        <NavButton
          title='Конструктор'
          isActive={isConstructorPage}
          icon={(<BurgerIcon type={`${isConstructorPage ? 'primary' : 'secondary'}`} />)}
          onClick={onConstructorClick}
        />
        <NavButton
          title='Лента заказов'
          isActive={false}
          icon={(<ListIcon type={'secondary'} />)}
        />
      </nav>
      <div className={`${appHeaderStyles.width33} ${appHeaderStyles.justifyCenter}`}>
        <div className={`${appHeaderStyles.logo}`} onClick={onConstructorClick}>
          <Logo />
        </div>
      </div>
      <div className={`${appHeaderStyles.width33} ${appHeaderStyles.justifyEnd}`}>
        <NavButton
          title='Личный кабинет'
          isActive={isProfilePage}
          icon={(<ProfileIcon type={`${isProfilePage ? 'primary' : 'secondary'}`}/>)}
          onClick={onProfileClick}
        />
      </div>
    </header>
  );
}
export default AppHeader;
