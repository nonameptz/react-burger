import {RootState} from '../reducers/root';
import {Middleware} from "redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

export const socketMiddleware = (
  wsUrl:string,
  wsActions:{
    wsInit:string,
    onOpen:string,
    onClose:string,
    onError:string,
    onMessageAction:ActionCreatorWithPayload<any>,
  }): Middleware<{}, RootState> => {
  return store => {
    let socket:WebSocket | null = null;

    return next => {
      return action => {
        const {dispatch} = store;
        const {type, payload} = action;
        const {wsInit, onOpen, onClose, onError, onMessageAction} = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}${payload || ''}`);
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

            dispatch(onMessageAction(parsedData));
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
