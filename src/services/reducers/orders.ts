import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { initialOrderState } from '../../utils/initStates';
import {IOrdersStore} from "../../types/store";

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrderState,
  reducers: {
    addOrUpdateAllOrders: (state:IOrdersStore, action:PayloadAction) => {
      //@ts-ignore
      const { orders, total, totalToday } = action.payload;
      state.allOrderList = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    addOrUpdateOrders: (state:IOrdersStore, action:PayloadAction) => {
      //@ts-ignore
      const { orders } = action.payload;
      if (orders) {
        state.orderList = orders.reverse();
      }
    },
  },
})

export const { addOrUpdateOrders, addOrUpdateAllOrders } = ordersSlice.actions

export default ordersSlice.reducer;
