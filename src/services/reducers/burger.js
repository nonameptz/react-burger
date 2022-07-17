import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API_DOMAIN from "../../constants/apiConstant";
import { initialState, initSelectedIngredientState } from '../../utils/initStates'

export const fetchBurgers = createAsyncThunk(
  'burger/fetch',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/ingredients`);
      const {data} = await response.json();
      return {
        buns: data.filter(food => food.type === 'bun'),
        mains: data.filter(food => food.type === 'main'),
        sauces: data.filter(food => food.type === 'sauce'),
      };
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Failed to fetch burgers :('
      })
    }
  }
);

export const setOrder = createAsyncThunk(
  'burger/order',
  async (ingredients, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients})
      });
      const data = await response.json();
      return data.order.number;
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Failed to fetch burgers :('
      })
    }
  }
);

const increaseCounter = (ingredients, id) => {
  ingredients.map((ingredient) => {
    if (ingredient._id === id) {
      ingredient.counter = ingredient.counter > 0
        ? ingredient.counter + 1
        : 1;
    }
    return ingredient;
  });
}
const decreaseCounter = (ingredients, id) => {
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
    addBun: (state, action) => {
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
      state.constructorList.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.totalPrice -= state.constructorList[action.payload].price;
      decreaseCounter(
        [...state.ingredients.sauces, ...state.ingredients.mains],
        state.constructorList[action.payload]._id
      );
      state.constructorList.splice(action.payload, 1);
    },
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
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
      state.ingredients = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchBurgers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      if (action.payload) {
        state.errorMsg = action.payload;
      }
    })

    builder
      .addCase(setOrder.fulfilled, (state, action) => {
        state.orderNum = action.payload;
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.orderNum = null;
        if (action.payload) {
          state.orderErrorMsg = action.payload;
        }
      })
}})

export const { addBun, addIngredient, selectIngredient, unselectIngredient, removeIngredient, sortConstructorElements } = burgerSlice.actions

export default burgerSlice.reducer;
