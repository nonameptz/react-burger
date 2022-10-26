import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API_DOMAIN from "../../constants/apiConstant";
import { initialState, initSelectedIngredientState } from '../../utils/initStates';
import { v4 as uuidv4 } from 'uuid';
import checkResponse from '../../utils/checkResponse';
import {getCookie, setCookie} from "../../utils/cookie";
import {refreshTokenRequest} from "./auth";
import {IIngredient} from "../../types/store";
import {getIngredient} from "../../utils/getIngredient";

export const fetchBurgers = createAsyncThunk(
  'burger/fetch',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/ingredients`);
      const {data} = await checkResponse(response);
      return {
        buns: data.filter(food => food.type === 'bun'),
        mains: data.filter(food => food.type === 'main'),
        sauces: data.filter(food => food.type === 'sauce'),
      };
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Ошибка загрузки ингредиентов. Текст ошибки: ' + error
      })
    }
  }
);

export const setOrder = createAsyncThunk(
  'burger/order',
  async (ingredients:string[], thunkApi) => {
    try {
      const token = getCookie('accessToken');
      const response = await fetch(`${API_DOMAIN}api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ingredients})
      });
      const data = await checkResponse(response);
      return data.order.number;
    } catch (error:any) {
      if (error.message === 'jwt expired') {
        refreshTokenRequest()
          .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie('accessToken', res.accessToken, 2);
            thunkApi.dispatch(setOrder(ingredients));
          })
      }
      return thunkApi.rejectWithValue({
        message: 'Ошибка отправки заказа. Попробуйте снова.'
      })
    }
  }
);

const increaseCounter = (ingredients:Array<IIngredient>, id:string):void => {
  ingredients.map((ingredient) => {
    if (ingredient._id === id) {
      ingredient.counter = ingredient.counter > 0
        ? ingredient.counter + 1
        : 1;
    }
    return ingredient;
  });
}
const decreaseCounter = (ingredients:Array<IIngredient>, id:string):void => {
  ingredients.map((ingredient) => {
    if (ingredient._id === id) {
      ingredient.counter = ingredient.counter - 1;
    }
    return ingredient;
  });
}


export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addBun: (state = initialState, action) => {
      if (state.constructorBun.price) {
        state.totalPrice -= 2 * state.constructorBun.price;
        decreaseCounter(state.ingredients.buns, state.constructorBun._id);
      }
      state.totalPrice += 2 * action.payload.price;
      increaseCounter(state.ingredients.buns, action.payload._id);
      state.constructorBun = action.payload;
    },
    addIngredient: (state, action) => {
      state.totalPrice += action.payload.price;
      increaseCounter(
        [...state.ingredients.sauces, ...state.ingredients.mains],
        action.payload._id
      );
      state.constructorList.push({
        ...action.payload,
        uuid: uuidv4(),
      });
    },
    removeIngredient: (state= initialState, action) => {
      state.totalPrice -= state.constructorList[action.payload].price;
      decreaseCounter(
        [...state.ingredients.sauces, ...state.ingredients.mains],
        state.constructorList[action.payload]._id
      );
      state.constructorList.splice(action.payload, 1);
    },
    selectIngredient: (state, action) => {
      const findIng = getIngredient(state.ingredients, action.payload.id);
      if (findIng !== undefined) {
        state.selectedIngredient = findIng;
      }
    },
    unselectIngredient: (state) => {
      state.selectedIngredient = initSelectedIngredientState;
    },
    sortConstructorElements: (state, action) => {
      state.constructorList.splice(
        action.payload.to,
        0,
        state.constructorList.splice(action.payload.from, 1)[0]
      );
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBurgers.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(fetchBurgers.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.ingredients = action.payload;
        state.isLoaded = true;
        state.isLoading = false;
      }
    })
    .addCase(fetchBurgers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      if (typeof action.payload === 'string') {
        state.errorMsg = action.payload;
      }
    })

    builder
      .addCase(setOrder.pending, (state, action) => {
        state.orderLoading = true;
        state.orderErrorMsg = '';
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderNum = action.payload;
        state.constructorList = initialState.constructorList;
        state.constructorBun = initialState.constructorBun;
        state.totalPrice = 0;
        [
          ...state.ingredients.buns,
          ...state.ingredients.sauces,
          ...state.ingredients.mains
        ].map(ingredient => {
          ingredient.counter = 0;
          return ingredient;
        });
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderNum = 0;
        if (typeof action.payload === 'string') {
          state.orderErrorMsg = action.payload;
        }
      })
}})

export const { addBun, addIngredient, selectIngredient, unselectIngredient, removeIngredient, sortConstructorElements } = burgerSlice.actions

export default burgerSlice.reducer;
