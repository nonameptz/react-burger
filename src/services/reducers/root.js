import burgerReducer from './burger';
import authReducer from './auth';
import {combineReducers} from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerReducer
});

export default rootReducer;
