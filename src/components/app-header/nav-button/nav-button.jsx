import React from "react";

import './nav-button.css';

const NavButton = ({title, icon, isActive=false}) => {
  return (
    <div className='nav-element p-5 mr-2'>
      {icon}
      <span className={`text text_type_main-default text_color_${isActive ? 'active' : 'inactive'} ml-2`}>{title}</span>
    </div>
  )
}

export default NavButton;
