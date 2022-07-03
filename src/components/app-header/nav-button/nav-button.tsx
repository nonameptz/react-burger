import React, {FunctionComponent} from "react";
import navButtonStyles from './nav-button.module.css';

interface NavButtonProps {
  title: string,
  icon: JSX.Element,
  isActive?: boolean
}

const NavButton: FunctionComponent<NavButtonProps> = ({title, icon, isActive=false}) => {
  return (
    <div className={`${navButtonStyles.navElement} p-5 mr-2`}>
      <>
        {icon}
        <span className={`text text_type_main-default text_color_${isActive ? 'active' : 'inactive'} ml-2`}>{title}</span>
      </>
    </div>
  )
}

export default NavButton;
