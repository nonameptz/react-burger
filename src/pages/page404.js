import {useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './page404.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const NotFound404 = () => {
  const history = useHistory();
  const onBackClick = useCallback(
    () => {
      history.push({ pathname: '/' });
    },
    [history]
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className="text text_type_main-medium">Такой страницы нет.. Как вы сюда попали?</h3>
        <br />
        <Button type="primary" size="large" onClick={onBackClick}>
          Перейти на главную
        </Button>
      </div>
    </div>
  );
};
