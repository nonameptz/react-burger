import orderReducer, {
  addOrUpdateOrders, addOrUpdateAllOrders, setSelectedOrder
} from './orders'
import { initialOrderState } from '../../utils/initStates';
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
      allOrderList: [
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 1,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
          _id: "testid",
        },
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 2,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
          _id: "testid",
        }
      ],
      total: 10,
      totalToday: 1
    }
    const action = addOrUpdateAllOrders({
      orders: [
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 1,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
        },
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 2,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
        }
      ],
      total: 10,
      totalToday: 1,
    });
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })


  it('should add or update orders', () => {
    const expectedState = {
      ...initialState,
      orderList: [
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 2,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
          _id: "testid",
        },
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 1,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
          _id: "testid",
        },
      ],
    }
    const action = addOrUpdateOrders({
      orders: [
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 1,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
        },
        {
          ingredients: ['123', '456', '789'],
          name: 'name',
          status: 'status',
          number: 2,
          createdAt: '10/10/2022',
          updatedAt: '10/12/2022',
        }
      ],
      total: 10,
      totalToday: 1,
    });
    expect(orderReducer(initialState, action)).toEqual(expectedState)
  })

})
