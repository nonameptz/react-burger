export interface IIngredient {
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
  constructorList: [];
  constructorBun: IIngredient;
  totalPrice: number;
  orderLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMsg: string;
}

export interface IRootStore {
  auth: any; //temporary
  burger: IBurgerStore;
}
