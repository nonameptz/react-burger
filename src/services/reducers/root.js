import burgerReducer from './burger';
import {combineReducers} from "redux";
const rootReducer = combineReducers({
  burger: burgerReducer
});

export default rootReducer;
