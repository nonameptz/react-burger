import {FC, SyntheticEvent} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../components/button/button";
import commonStyles from "./common.module.css";
import {login} from "../services/reducers/auth";
import {useDispatch, useSelector} from '../types/dispatch';
import {useForm} from "../hooks/useForm";

export const LoginPage:FC = () => {
  const dispatch = useDispatch();
  const { isError, errorMsg } = useSelector(store => store.auth)
  const history = useHistory<any>();
  const from = history.location?.state?.from;
  const {values, handleChange} = useForm({
    password: '',
    email: '',
    token: '',
  });
  const onSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(values))
      .catch(() => {
        history.replace({ pathname: from || '/' });
      })
  };
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <form className={commonStyles.form} onSubmit={onSubmit}>
        <div className='mb-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
          />
        </div>
        <div className='mb-6'>
          <PasswordInput
            value={values.password}
            onChange={handleChange}
            name={'password'}
          />
        </div>
        {isError && (
          <p className='input__error text_type_main-default'>{errorMsg}</p>
        )}
        <Button type="primary" size="large" disabled={!values.password || !values.email}>
          Войти
        </Button>
      </form>
      <div className={`${commonStyles.footerText} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </p>
        <Button type="secondary"
                size="medium"
                onClick={() => history.push({pathname: '/register'})}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${commonStyles.footerText} mt-4`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </p>
        <Button type="secondary"
                size="medium"
                onClick={() => history.push({pathname: '/forgot-password'})}
        >
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
};
