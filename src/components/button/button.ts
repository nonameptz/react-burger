import {SyntheticEvent} from "react";
import {Button as ButtonUI} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const Button: React.FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}> = ButtonUI;

export default Button;
