import burgerReducer, {
  addBun,
  addIngredient,
  selectIngredient,
  unselectIngredient,
  removeIngredient,
  sortConstructorElements, fetchBurgers, setOrder
} from './burger'
import { initialState } from '../../utils/initStates';
jest.mock('uuid', () => ({ v4: () => 'testid' }));
import { ingredients, selectedIngredient, ingredientToSelect } from './ingredients.mock.js'

describe('burger reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      ...initialState,
      ingredients
    };
  })

  it('should add bun', () => {
    const action = addBun({
      type: 'bun',
      image_mobile: '',
      image: '',
      image_large: '',
      name: 'bun',
      price: 10,
      calories: 1,
      proteins: 2,
      carbohydrates: 3,
      fat: 4,
      _id: '123',
      counter: 0,
    })
    const expectedState = {
      ...state,
      constructorBun: {
        type: 'bun',
        image_mobile: '',
        image: '',
        image_large: '',
        name: 'bun',
        price: 10,
        calories: 1,
        proteins: 2,
        carbohydrates: 3,
        fat: 4,
        _id: '123',
        counter: 0,
      },
      totalPrice: 20,
    }

    expect(burgerReducer(state, action)).toEqual(expectedState)
  })
  it('should add ingredient', () => {
    const action = addIngredient(ingredientToSelect)
    const expectedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        mains: state.ingredients.mains.map((ingredient) => {
          if (ingredient._id === ingredientToSelect._id) {
            return {
              ...ingredient,
              counter: ingredient.counter + 1
            };
          } else {
            return ingredient
          }
        })
      },
      constructorList: [{
        ...ingredientToSelect,
        uuid: "testid",
      }],
      totalPrice: 988,
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)
  })
  it('should remove ingredient', () => {
    const action = addIngredient(ingredientToSelect)
    const expectedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        mains: state.ingredients.mains.map((ingredient) => {
          if (ingredient._id === ingredientToSelect._id) {
            return {
              ...ingredient,
              counter: ingredient.counter + 1
            };
          } else {
            return ingredient
          }
        })
      },
      constructorList: [{
        ...ingredientToSelect,
        uuid: "testid",
      }],
      totalPrice: 988,
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)

    const rAction = removeIngredient(0)

    const rExpectedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        mains: state.ingredients.mains.map((ingredient) => {
          if (ingredient._id === ingredientToSelect._id) {
            return {
              ...ingredient,
              counter: ingredient.counter > 0 ? ingredient.counter - 1 : 0
            };
          } else {
            return ingredient
          }
        })
      },
      constructorList: [],
      totalPrice: 0,
    }
    expect(burgerReducer(expectedState, rAction)).toEqual(rExpectedState)
  })
  it('should select ingredient', () => {
    const action = selectIngredient({id: '60d3b41abdacab0026a733cc'})
    const expectedState = {
      ...state,
      selectedIngredient
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)
  })
  it('should unselect ingredient', () => {
    const action = selectIngredient({id: '60d3b41abdacab0026a733cc'})
    const expectedState = {
      ...state,
      selectedIngredient
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)

    const action2 = unselectIngredient()
    expect(burgerReducer(state, action2)).toEqual(state)
  })
  it('should sort constructor elements', () => {
    const initState = {
      ...state,
      constructorList: [
        '1', '2', '3', '4'
      ]
    }
    const action = sortConstructorElements({from: 2, to: 3})
    const expectedState = {
      ...state,
      constructorList: [
        '1', '2', '4', '3'
      ]
    }
    expect(burgerReducer(initState, action)).toEqual(expectedState)
  })

  it('should fetchBurgers set status to "pending"', async () => {
    const action = { type: fetchBurgers.pending.type }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      isLoading: true,
      isError: false,
    })
  })
  it('should fetchBurgers set status to "fulfilled"', async () => {
    const action = { type: fetchBurgers.fulfilled.type, payload: ['1', '2', '3'] }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      isLoaded: true,
      isLoading: false,
      ingredients: ['1', '2', '3']
    })
  })
  it('should fetchBurgers set status to "rejected"', async () => {
    const action = { type: fetchBurgers.rejected.type, payload: 'error' }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      isError: true,
      isLoading: false,
      errorMsg: 'error'
    })
  })

  it('should setOrder set status to "pending"', async () => {
    const action = { type: setOrder.pending.type }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      orderLoading: true,
      orderErrorMsg: '',
    })
  })
  it('should setOrder set status to "fulfilled"', async () => {
    const action = { type: setOrder.fulfilled.type, payload: 123 }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      orderLoading: false,
      totalPrice: 0,
      orderNum: 123,
    })
  })
  it('should setOrder set status to "rejected"', async () => {
    const action = { type: setOrder.rejected.type, payload: 'error' }
    expect(burgerReducer(state, action)).toEqual({
      ...state,
      orderErrorMsg: 'error',
      orderLoading: false,
      orderNum: 0
    })
  })
})
