import burgerReducer from './burger';
import authReducer from './auth';
import ordersReducer from './orders';
import {combineReducers} from "redux";
import store from "../store";

const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerReducer,
  orders: ordersReducer
});
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default rootReducer;
