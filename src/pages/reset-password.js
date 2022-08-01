import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input, PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./common.module.css";
import {useDispatch} from "react-redux";
import { resetPassword } from "../services/reducers/auth";

export const ResetPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  if (!history.location?.state?.fromForgotPassword) {
    history.replace({ pathname: '/forgot-password' });
  }

  const onResetClick = async () => {
    const result = await dispatch(resetPassword({password, token}))
    if (result.payload === true) {
      history.replace({ pathname: '/login' });
    }
  }
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <div className='mb-6'>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          name={'password'}
        />
      </div>
      <div className='mb-6'>
        <Input
          type={'email'}
          placeholder={'Введите код из письма'}
          onChange={e => setToken(e.target.value)}
          value={token}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
      <Button type="primary" size="large" onClick={onResetClick}>
        Сохранить
      </Button>
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
