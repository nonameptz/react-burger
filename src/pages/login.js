import {useState, useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./common.module.css";
import {login} from "../services/reducers/auth";
import {useDispatch, useSelector} from "react-redux";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { isError, errorMsg } = useSelector(store => store.auth)
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onEnterClick = async () => {
    const response = await dispatch(login({email, password}));

    if (!response.error && !response.payload?.message) {
      history.replace({ pathname: '/' });
    }
  };
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <div className='mb-6'>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
      <div className='mb-6'>
        <PasswordInput
          value={password}
          onChange={e => setPassword(e.target.value)}
          name={'password'}
        />
      </div>
      {isError && (
        <p className='input__error text_type_main-default'>{errorMsg}</p>
      )}
      <Button type="primary" size="large" onClick={onEnterClick}>
        Войти
      </Button>
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
