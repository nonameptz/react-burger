import {useEffect} from "react";
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUser, setUser} from "../../services/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(store => store.auth);

  const {values, handleChange} = useForm({
    name,
    email,
    password: '',
  });

  useEffect(() => {
    dispatch(getUser());
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
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
