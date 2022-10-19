import {IBurgerStore, IIngredient} from '../types/store';

export const initSelectedIngredientState:IIngredient = {
  type: '',
  image_mobile: '',
  image: '',
  image_large: '',
  name: '',
  price: 0,
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  fat: 0,
  _id: '',
  counter: 0,
};

export const initialState:IBurgerStore = {
  ingredients: {
    buns: [],
    mains: [],
    sauces: [],
  },
  isLoading: false,
  isLoaded: false,
  isError: false,
  errorMsg: '',

  //ingredient
  selectedIngredient: initSelectedIngredientState,

  //constructor
  constructorBun: initSelectedIngredientState,
  constructorList: [],
  totalPrice: 0,
  //order
  orderNum: 0,
  orderLoading: false,
  orderErrorMsg: '',
};

export const initialAuthState = {
  name: '',
  password: '',
  email: '',

  isLoggedIn: false,

  isError: false,
  errorMsg: '',
};

export const inititalOrder = {
  _id: '',
  name: '',
  status: '',
  number: 0,
  createdAt: '',
  updatedAt: '',
  ingredients: [''],
};

export const initialOrderState = {
  allOrderList: [inititalOrder],
  orderList: [inititalOrder],
  total: 0,
  totalToday: 0,
};
