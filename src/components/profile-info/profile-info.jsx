import {useEffect, useState} from "react";
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUser, setUser, setStateEmail, setStateUserName} from "../../services/reducers/auth";
import {useDispatch, useSelector} from "react-redux";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const { name, email } = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [])

  const onSaveClick = () => {
    dispatch(setUser({ name, email }));
  }

  return (
    <>
      <div className='mb-6'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onChange={e => {dispatch(setStateUserName({name: e.target.value}))}}
          value={name}
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
          onChange={e => {dispatch(setStateEmail({email: e.target.value}))}}
          value={email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
      <div className='mb-6'>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          name={'password'}
        />
      </div>
      <Button type="primary" size="large" onClick={onSaveClick}>
        Сохранить
      </Button>
    </>
  )
}
