import {createSlice} from "@reduxjs/toolkit";
import { initialOrderState } from '../../utils/initStates';
import {IOrdersStore} from "../../types/store";

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrderState,
  reducers: {
    addOrUpdateAllOrders: (state:IOrdersStore, action:{payload: {orders: [], total: number, totalToday: number}}) => {
      const { orders, total, totalToday } = action.payload;
      state.allOrderList = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    addOrUpdateOrders: (state:IOrdersStore, action:{payload: {orders: [], total: number, totalToday: number}}) => {
      const { orders } = action.payload;
      if (orders) {
        state.orderList = orders.reverse();
      }
    },
  },
})

export const { addOrUpdateOrders, addOrUpdateAllOrders } = ordersSlice.actions

export default ordersSlice.reducer;
