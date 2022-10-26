import React, {FC, useCallback, useEffect} from 'react';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import {Tab as TabUI} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from './profile.module.css';
import {ProfileInfo} from "../components/profile-info/profile-info";
import {logout} from "../services/reducers/auth";
import {useDispatch, useSelector} from '../types/dispatch';
import FeedList from "../components/feed-list/feed-list";
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_START
} from "../types/actionTypes";
import {getCleanCookie} from "../utils/cookie";

const Tab: React.FC<{
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}> = TabUI;

export const ProfilePage:FC = () => {
  const { orderList } = useSelector(store => store.orders);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  useEffect(() => {
    const payload = `?token=${getCleanCookie('accessToken')}`;
    dispatch({ type: WS_ORDERS_CONNECTION_START, payload });
    return () => {
      dispatch({ type: WS_ORDERS_CONNECTION_CLOSED });
    }
  }, []);
  const selectProfileTab = useCallback(
    () => {
      history.replace({ pathname: '/profile' });
    },
    [history]
  );
  const selectOrdersTab = useCallback(
    () => {
      history.replace({ pathname: '/profile/orders' });
    },
    [history]
  );

  const onLogoutClick = async () => {
    await dispatch(logout());
    history.push({ pathname: '/login' });
  }
  return (
    <div className={profileStyles.profile}>
      <div className={profileStyles.tabs}>
        <Tab value="profile" active={path === '/profile'} onClick={selectProfileTab}>
          Профиль
        </Tab>
        <Tab value="orders" active={path === '/profile/orders'} onClick={selectOrdersTab}>
          История заказов
        </Tab>
        <Tab value="logout" active={false} onClick={onLogoutClick}>
          Выход
        </Tab>
        <div className='mt-20'>
          <p className='text text_type_main-default text_color_inactive'>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className={`${profileStyles.content} ml-15`}>
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileInfo />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <FeedList urlPrefix='/profile/orders/' orderList={orderList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
