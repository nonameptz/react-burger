import {FC, SyntheticEvent, useEffect} from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import Button from "../button/button";
import {getUser, setUser} from "../../services/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {TProfileInfoForm, useForm} from "../../hooks/useForm";
import {IRootStore} from "../../types/store";

export const ProfileInfo:FC = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector<IRootStore, {name: string, email: string}>(store => store.auth);

  const {values, handleChange} = useForm<TProfileInfoForm>({
    name,
    email,
    password: '',
  });

  useEffect(() => {
    //@ts-ignore
    dispatch(getUser());
  }, [])

  const onSubmit = (e:SyntheticEvent):void => {
    e.preventDefault();
    //@ts-ignore
    dispatch(setUser({ name: values.name, email: values.email }));
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-6'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
      <div className='mb-6'>
        <Input
          type={'email'}
          icon={'EditIcon'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
      <div className='mb-6'>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={values.password}
          onChange={handleChange}
          name={'password'}
        />
      </div>
      <Button type="primary" size="large">
        Сохранить
      </Button>
    </form>
  )
}
