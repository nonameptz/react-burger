import {FC, SyntheticEvent} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button as ButtonUI,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./common.module.css";
import {login} from "../services/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../hooks/useForm";
import {IRootStore} from "../types/store";

const Button: React.FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}> = ButtonUI;

export const LoginPage:FC = () => {
  const dispatch = useDispatch();
  const { isError, errorMsg } = useSelector<IRootStore, {isError: boolean, errorMsg: string}>(store => store.auth)
  const history = useHistory<any>();
  const from = history.location?.state?.from;
  const {values, handleChange} = useForm({
    password: '',
    email: '',
  });
  const onSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    //@ts-ignore
    const response = await dispatch(login(values));

    if (!response.error && !response.payload?.message) {
      history.replace({ pathname: from || '/' });
    }
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
