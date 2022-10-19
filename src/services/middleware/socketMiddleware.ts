import { addOrUpdateOrders, addOrUpdateAllOrders } from '../reducers/orders'
import {
  WS_ORDERS_ALL_GET_MESSAGE,
  WS_ORDERS_GET_MESSAGE
} from '../../types/actionTypes'
import {RootState} from '../reducers/root';
import {Middleware} from "redux";

export const socketMiddleware = (
  wsUrl:string,
  wsActions:{
    wsInit:string,
    onOpen:string,
    onClose:string,
    onError:string,
    onMessage:string,
  }): Middleware<{}, RootState> => {
  return store => {
    let socket:WebSocket | null = null;

    return next => {
      return action => {
        const {dispatch} = store;
        const {type} = action;
        const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(wsUrl);
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({type: onOpen, payload: event});
          };

          socket.onerror = event => {
            dispatch({type: onError, payload: event});
          };

          socket.onmessage = event => {
            const {data} = event;
            const parsedData = JSON.parse(data);

            if (onMessage === WS_ORDERS_GET_MESSAGE) {
              //@ts-ignore
              dispatch(addOrUpdateOrders(parsedData));
            } else if (onMessage === WS_ORDERS_ALL_GET_MESSAGE) {
              //@ts-ignore
              dispatch(addOrUpdateAllOrders(parsedData));
            }
          };

          socket.onclose = event => {
            dispatch({type: onClose, payload: event});
          };
        }

        next(action);
      };
    };
  };
};
