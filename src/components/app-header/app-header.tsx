import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from "@ya.praktikum/react-developer-burger-ui-components";
import './app-header.css';
import NavButton from "./nav-button/nav-button";

class AppHeader extends React.Component {
  render() {
    return (
      <div className='header p-4'>
        <nav className='width33'>
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
        <div className='width33 justify-center'>
          <Logo />
        </div>
        <div className='width33 justify-end'>
          <NavButton
            title='Личный кабинет'
            icon={(<ProfileIcon type="secondary" />)}
          />
        </div>
      </div>
    );
  }
}
export default AppHeader;
