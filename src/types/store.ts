export interface IIngredient {
  type: string;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  _id: string;
  counter: number;
  uuid?: string;
}
export interface IIngredientsList {
  [name: string]: Array<IIngredient>;
}
export interface IBurgerStore {
  ingredients: IIngredientsList;
  selectedIngredient: IIngredient;
  isLoaded: boolean;
  orderNum: number;
  constructorList: Array<IIngredient>;
  constructorBun: IIngredient;
  totalPrice: number;
  orderLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMsg: string;
  orderErrorMsg: string;
}

export interface IAuthStore {
  isError: boolean;
  errorMsg: string;
  isLoggedIn: boolean;
  name: string;
  email: string;
}

export type TOrderPreview = {
  ingredients: Array<string>,
  name: string,
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  total?: number,
  ingredientsList: {
    [id:string]: IIngredient & {
      amount?: number;
    }
  }
}

export interface IOrdersStore {
  allOrderList: Array<TOrderPreview>,
  orderList: Array<TOrderPreview>,
  total: number,
  totalToday: number,
}

export interface IRootStore {
  auth: IAuthStore;
  burger: IBurgerStore;
  orders: IOrdersStore;
}
