import {useDispatch, useSelector} from '../types/dispatch';
import feedListPageStyles from "./feed-list.module.css";
import React, {FC, useEffect, useState} from "react";
import {IBurgerStore, IOrdersStore} from "../types/store";
import FeedList from "../components/feed-list/feed-list";
import {
  WS_ORDERS_ALL_CONNECTION_CLOSED,
  WS_ORDERS_ALL_CONNECTION_START
} from "../types/actionTypes";

export const FeedListPage:FC = () => {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector<IBurgerStore>(store => store.burger);
  const { allOrderList, total, totalToday } = useSelector<IOrdersStore>(store => store.orders);
  const [doneOrders, setDoneOrders] = useState<Array<number>>([0]);
  const [inProgressOrders, setInProgressOrders] = useState<Array<number>>([0]);
  useEffect(() => {
    dispatch({ type: WS_ORDERS_ALL_CONNECTION_START });
    return () => {
      dispatch({ type: WS_ORDERS_ALL_CONNECTION_CLOSED });
    }
  }, []);
  useEffect(() => {
    if (allOrderList.length) {
      setDoneOrders(allOrderList
        .filter(item => item.status === 'done')
        .map(item => item.number)
        .splice(0, 10)
      );
      setInProgressOrders(allOrderList
        .filter(item => item.status === 'created')
        .map(item => item.number)
        .splice(0, 10)
      );
    }
  }, [allOrderList]);
  if (!isLoaded) {
    return null;
  }

  return (
    <div className={feedListPageStyles.mainContent}>
      <h2 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h2>
      <div className={feedListPageStyles.content}>
        <div className={feedListPageStyles.feedList}>
          <FeedList urlPrefix='/feed/' orderList={allOrderList} />
        </div>
        <div className={`flex ${feedListPageStyles.rightPanel} ml-15`}>
          <div className={feedListPageStyles.ordersInfo}>
            <div className={feedListPageStyles.ordersInfoSection}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <div className={`flex ${feedListPageStyles.ordersInfoSectionList}`}>
                {doneOrders.map((order, index) => (
                  <p key={index} className={`mb-5 text text_type_digits-default ${feedListPageStyles.orderDone}`}>
                    {order}
                  </p>
                ))}
              </div>
            </div>
            <div className={feedListPageStyles.ordersInfoSection}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <div className={`flex ${feedListPageStyles.ordersInfoSectionList}`}>
                {inProgressOrders.map((order, index) => (
                  <p key={index} className={`mb-5 text text_type_digits-default`}>
                    {order}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className='mt-15'>
            <h3 className='text text_type_main-medium mb-6'>Выполнено за все время:</h3>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className='mt-15'>
            <h3 className='text text_type_main-medium mb-6'>Выполнено за сегодня:</h3>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
