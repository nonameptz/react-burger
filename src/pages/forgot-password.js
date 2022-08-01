import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from "./common.module.css";
import {useDispatch} from "react-redux";
import { forgetPassword } from "../services/reducers/auth";

export const ForgotPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const onRecoveryClick = async () => {
    const result = await dispatch(forgetPassword(email))
    if (result.payload === true) {
      history.push({
        pathname: '/reset-password',
        state: { fromForgotPassword: true }
      });
    }
  }
  return (
    <div className={commonStyles.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
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
      <Button type="primary" size="large" onClick={onRecoveryClick}>
        Восстановить
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
