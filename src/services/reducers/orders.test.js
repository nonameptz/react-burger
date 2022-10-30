import orderReducer, {
  addOrUpdateOrders, addOrUpdateAllOrders, setSelectedOrder
} from './orders'
import { initialOrderState } from '../../utils/initStates';
import { orders } from './orders.mock.js'
jest.mock('uuid', () => ({ v4: () => 'testid' }));

describe('Orders reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = initialOrderState;
  })

  it('should select order', () => {
    const action = setSelectedOrder(123)
    const expectedState = { ...initialState, selectedOrder: 123 }

    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

  it('should add or update all orders', () => {
    const expectedState = {
      ...initialState,
      allOrderList: orders.map(order => ({ ...order, _id: 'testid'})),
      total: 10,
      totalToday: 1
    }
    const action = addOrUpdateAllOrders({
      orders,
      total: 10,
      totalToday: 1,
    });
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })


  it('should add or update orders', () => {
    const orderList = [...orders].reverse().map(order => ({ ...order, _id: 'testid'}))
    const expectedState = {
      ...initialState,
      orderList,
    }
    const action = addOrUpdateOrders({
      orders,
      total: 10,
      totalToday: 1,
    });
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

})
