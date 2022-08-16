import {FC, SyntheticEvent, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button as ButtonUI,
  Input, PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./common.module.css";
import {useDispatch} from "react-redux";
import { resetPassword } from "../services/reducers/auth";
import {useForm} from "../hooks/useForm";

const Button: React.FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}> = ButtonUI;

export const ResetPasswordPage:FC = () => {
  const history = useHistory<any>();
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    password: '',
    token: '',
  });

  if (!history.location?.state?.fromForgotPassword) {
    history.replace({ pathname: '/forgot-password' });
  }

  const onSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    const result = await dispatch(resetPassword(values))
    if (result.payload === true) {
      history.replace({ pathname: '/login' });
    }
  }
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={commonStyles.form} onSubmit={onSubmit}>
        <div className='mb-6'>
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            name={'password'}
          />
        </div>
        <div className='mb-6'>
          <Input
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={values.token}
            name={'token'}
            errorText={'Ошибка'}
          />
        </div>
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </form>
      <div className={`${commonStyles.footerText} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </p>
        <Button type="secondary"
                size="medium"
                onClick={() => history.push({pathname: '/login'})}
        >
          Войти
        </Button>
      </div>
    </div>
  );
};
