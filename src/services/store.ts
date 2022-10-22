import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/root";
import {socketMiddleware} from "./middleware/socketMiddleware";

import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_ALL_CONNECTION_CLOSED,
  WS_ORDERS_ALL_CONNECTION_ERROR,
  WS_ORDERS_ALL_CONNECTION_START,
  WS_ORDERS_ALL_CONNECTION_SUCCESS,
} from '../types/actionTypes';

import { addOrUpdateOrders, addOrUpdateAllOrders } from './reducers/orders'
const ordersAllWSUrl = 'wss://norma.nomoreparties.space/orders/all';
const ordersAllActions = {
  wsInit: WS_ORDERS_ALL_CONNECTION_START,
  onOpen: WS_ORDERS_ALL_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_ALL_CONNECTION_CLOSED,
  onError: WS_ORDERS_ALL_CONNECTION_ERROR,
  onMessageAction: addOrUpdateAllOrders,
};
const ordersWSUrl = `wss://norma.nomoreparties.space/orders`;
const ordersActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessageAction: addOrUpdateOrders,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      socketMiddleware(ordersAllWSUrl, ordersAllActions),
      socketMiddleware(ordersWSUrl, ordersActions),
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
