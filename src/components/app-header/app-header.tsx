import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import NavButton from "./nav-button/nav-button";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${appHeaderStyles.header} p-4`}>
        <nav className={appHeaderStyles.width33}>
          <NavButton
            title='Конструктор'
            isActive={true}
            icon={(<BurgerIcon type="primary" />)}
          />
          <NavButton
            title='Лента заказов'
            icon={(<ListIcon type="secondary" />)}
          />
        </nav>
        <div className={`${appHeaderStyles.width33} ${appHeaderStyles.justifyCenter}`}>
          <Logo />
        </div>
        <div className={`${appHeaderStyles.width33} ${appHeaderStyles.justifyEnd}`}>
          <NavButton
            title='Личный кабинет'
            icon={(<ProfileIcon type="secondary" />)}
          />
        </div>
      </header>
    );
  }
}
export default AppHeader;
