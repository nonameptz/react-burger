import { useHistory } from 'react-router-dom';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../components/button/button";
import commonStyles from "./common.module.css";
import {useDispatch} from '../types/dispatch'
import { forgetPassword } from "../services/reducers/auth";
import {useForm} from "../hooks/useForm";
import {FC, SyntheticEvent} from "react";

export const ForgotPasswordPage:FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    email: '',
  });
  const onSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    const result = await dispatch(forgetPassword(values.email))
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
        <Button type="primary" size="large">
          Восстановить
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
