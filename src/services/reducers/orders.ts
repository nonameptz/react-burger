import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { initialOrderState } from '../../utils/initStates';
import {IOrdersStore, TOrderPreview} from "../../types/store";

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrderState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    addOrUpdateAllOrders: (state:IOrdersStore, action:{payload: {orders: [], total: number, totalToday: number}}) => {
      const { orders, total, totalToday } = action.payload;
      state.allOrderList = orders.map((order:TOrderPreview) => {
        return {
          ...order,
          ...{
            _id: uuidv4()
          }
        };
      });
      state.total = total;
      state.totalToday = totalToday;
    },
    addOrUpdateOrders: (state:IOrdersStore, action:{payload: {orders: [], total: number, totalToday: number}}) => {
      const { orders } = action.payload;
      if (orders) {
        state.orderList = orders.reverse().map((order:TOrderPreview) => {
          return {
            ...order,
            ...{
              _id: uuidv4()
            }
          };
        });
      }
    },
  },
})

export const { addOrUpdateOrders, addOrUpdateAllOrders, setSelectedOrder } = ordersSlice.actions

export default ordersSlice.reducer;
