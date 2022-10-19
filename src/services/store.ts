import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/root";
import {socketMiddleware} from "./middleware/socketMiddleware";

import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_GET_MESSAGE,
  WS_ORDERS_ALL_CONNECTION_CLOSED,
  WS_ORDERS_ALL_CONNECTION_ERROR,
  WS_ORDERS_ALL_CONNECTION_START,
  WS_ORDERS_ALL_CONNECTION_SUCCESS,
  WS_ORDERS_ALL_GET_MESSAGE,
} from '../types/actionTypes';
import {getCookie} from "../utils/cookie";

const ordersAllWSUrl = 'wss://norma.nomoreparties.space/orders/all';
const ordersAllActions = {
  wsInit: WS_ORDERS_ALL_CONNECTION_START,
  onMessage: WS_ORDERS_ALL_GET_MESSAGE,
  onOpen: WS_ORDERS_ALL_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_ALL_CONNECTION_CLOSED,
  onError: WS_ORDERS_ALL_CONNECTION_ERROR,
};
let accessToken = getCookie('accessToken');
if (accessToken) {
  accessToken = accessToken.split('Bearer ')[1];
}
const ordersWSUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
const ordersActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onMessage: WS_ORDERS_GET_MESSAGE,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(ordersAllWSUrl, ordersAllActions),
      socketMiddleware(ordersWSUrl, ordersActions),
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
