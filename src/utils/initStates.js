export const initialState = {
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
  selectedIngredient: {},

  //constructor
  constructorBun: {},
  constructorList: [],
  totalPrice: 0,
  //order
  orderNum: null,
  orderLoading: false,
  orderErrorMsg: '',
};

export const initSelectedIngredientState = {
  image_mobile: '',
  image_large: '',
  name: '',
  price: 0,
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
};

export const initialAuthState = {
  name: '',
  password: '',
  email: '',

  isLoggedIn: false,

  isError: false,
  errorMsg: '',
};
