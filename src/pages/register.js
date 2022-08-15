import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input, PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from '../services/reducers/auth';
import commonStyles from "./common.module.css";
import {useDispatch} from "react-redux";

export const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!name || !email || !password) {
      setError(true);
    } else {
      setError(false);
    }
  }, [name, email, password])

  const onRegiserClick = () => {
    dispatch(register({name, email, password}));
    history.replace({ pathname: '/login' });
  }
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <div className='mb-6'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
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
          placeholder={'Пароль'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          name={'password'}
        />
      </div>
      <Button type="primary" size="large" onClick={onRegiserClick} disabled={error}>
        Зарегистрироваться
      </Button>
      <div className={`${commonStyles.footerText} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
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
