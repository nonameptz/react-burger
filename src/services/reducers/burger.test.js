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

describe('burger reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      ...initialState,
      ingredients: {
        buns: [
          {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733c7',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0
          }
        ],
        mains: [
          {
            _id: '60d3b41abdacab0026a733c8',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733ca',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d0',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d1',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d2',
            name: 'Кристаллы марсианских альфа-сахаридов',
            type: 'main',
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: 'https://code.s3.yandex.net/react/code/core.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d3',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d4',
            name: 'Сыр с астероидной плесенью',
            type: 'main',
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: 'https://code.s3.yandex.net/react/code/cheese.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
            __v: 0
          }
        ],
        sauces: [
          {
            _id: '60d3b41abdacab0026a733cc',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733ce',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cf',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
            __v: 0
          }
        ]
      }
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
    const action = addIngredient({
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    })
    const expectedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        mains: [
          {
            _id: '60d3b41abdacab0026a733c8',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0,
            counter: 1,
          },
          {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733ca',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d0',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d1',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d2',
            name: 'Кристаллы марсианских альфа-сахаридов',
            type: 'main',
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: 'https://code.s3.yandex.net/react/code/core.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d3',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d4',
            name: 'Сыр с астероидной плесенью',
            type: 'main',
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: 'https://code.s3.yandex.net/react/code/cheese.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
            __v: 0
          }
        ],
      },
      constructorList: [{
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
        uuid: "testid",
      }],
      totalPrice: 988,
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)
  })
  it('should remove ingredient', () => {
    const action = addIngredient({
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    })
    const expectedState = {
      ...state,
      ingredients: {
        ...state.ingredients,
        mains: [
          {
            _id: '60d3b41abdacab0026a733c8',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0,
            counter: 1,
          },
          {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733ca',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d0',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d1',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d2',
            name: 'Кристаллы марсианских альфа-сахаридов',
            type: 'main',
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: 'https://code.s3.yandex.net/react/code/core.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d3',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d4',
            name: 'Сыр с астероидной плесенью',
            type: 'main',
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: 'https://code.s3.yandex.net/react/code/cheese.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
            __v: 0
          }
        ],
      },
      constructorList: [{
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0,
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
        mains: [
          {
            _id: '60d3b41abdacab0026a733c8',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0,
            counter: 0,
          },
          {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733ca',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d0',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d1',
            name: 'Плоды Фалленианского дерева',
            type: 'main',
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: 'https://code.s3.yandex.net/react/code/sp_1.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d2',
            name: 'Кристаллы марсианских альфа-сахаридов',
            type: 'main',
            proteins: 234,
            fat: 432,
            carbohydrates: 111,
            calories: 189,
            price: 762,
            image: 'https://code.s3.yandex.net/react/code/core.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d3',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
            __v: 0
          },
          {
            _id: '60d3b41abdacab0026a733d4',
            name: 'Сыр с астероидной плесенью',
            type: 'main',
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: 'https://code.s3.yandex.net/react/code/cheese.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
            __v: 0
          }
        ],
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
      selectedIngredient: {
        _id: '60d3b41abdacab0026a733cc',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
    }
    expect(burgerReducer(state, action)).toEqual(expectedState)
  })
  it('should unselect ingredient', () => {
    const action = selectIngredient({id: '60d3b41abdacab0026a733cc'})
    const expectedState = {
      ...state,
      selectedIngredient: {
        _id: '60d3b41abdacab0026a733cc',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      }
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
      ingredients: {
        buns: state.ingredients.buns.map(ingredient => {
          ingredient.counter = 0;
          return ingredient;
        }),
        sauces: state.ingredients.sauces.map(ingredient => {
          ingredient.counter = 0;
          return ingredient;
        }),
        mains: state.ingredients.mains.map(ingredient => {
          ingredient.counter = 0;
          return ingredient;
        })
      }
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
