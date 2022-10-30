import authReducer, {
  setStateUserName,
  setStateEmail,
  register,
  login, logout, getUser, setUser
} from './auth'
import { initialAuthState } from '../../utils/initStates';
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }
}
global.localStorage = new LocalStorageMock;

describe('Auth reducer', () => {
  let state;
  beforeEach(() => {
    state = initialAuthState;
  })

  it('should set user name', () => {
    const action = setStateUserName({name: 'name'})
    const expectedState = {
      ...state,
      name: 'name'
    }
    expect(authReducer(state, action)).toEqual(expectedState)
  })

  it('should set email', () => {
    const action = setStateEmail({email: 'name@mail.com'})
    const expectedState = {
      ...state,
      email: 'name@mail.com'
    }
    expect(authReducer(state, action)).toEqual(expectedState)
  })

  it('should register set status to "pending"', async () => {
    const action = { type: register.pending.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: false,
    })
  })
  it('should register set status to "fulfilled"', async () => {
    const action = { type: register.fulfilled.type,
      payload: {
        user: {
          name: 'name',
          email: 'email'
        },
        refreshToken: 'refreshToken',
        accessToken: 'accessToken'
    }}
    expect(authReducer(state, action)).toEqual({
      ...state,
      name: 'name',
      email: 'email'
    })
  })
  it('should register set status to "rejected"', async () => {
    const action = { type: register.rejected.type, payload: { message: 'errMsg' } }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: true,
      errorMsg: 'errMsg'
    })
  })
  it('should login set status to "pending"', async () => {
    const action = { type: login.pending.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: false,
    })
  })
  it('should login set status to "fulfilled"', async () => {
    const action = { type: login.fulfilled.type,
      payload: {
        user: {
          name: 'name',
          email: 'email'
        },
        refreshToken: 'refreshToken',
        accessToken: 'accessToken'
    }}
    expect(authReducer(state, action)).toEqual({
      ...state,
      name: 'name',
      email: 'email',
      isLoggedIn: true,
    })
  })
  it('should login set status to "rejected"', async () => {
    const action = { type: login.rejected.type, payload: { message: {message: 'errMsg'} } }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: true,
      errorMsg: 'errMsg'
    })
  })
  it('should logout set status to "pending"', async () => {
    const action = { type: logout.pending.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: false,
    })
  })
  it('should logout set status to "fulfilled"', async () => {
    const action = { type: logout.fulfilled.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isLoggedIn: false,
    })
  })
  it('should logout set status to "rejected"', async () => {
    const action = {type: logout.rejected.type, payload: {message: 'errMsg'}}
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: true,
      errorMsg: 'errMsg'
    })
  })
  it('should getUser set status to "pending"', async () => {
    const action = { type: getUser.pending.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: false,
    })
  })
  it('should getUser set status to "fulfilled"', async () => {
    const action = { type: getUser.fulfilled.type,
      payload: {
        user: {
          name: 'name',
          email: 'email'
        },
      }}
    expect(authReducer(state, action)).toEqual({
      ...state,
      name: 'name',
      email: 'email',
      isLoggedIn: true,
    })
  })
  it('should getUser set status to "rejected"', async () => {
    const action = { type: getUser.rejected.type, payload: { message: 'errMsg' } }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: true,
      errorMsg: 'errMsg'
    })
  })
  it('should setUser set status to "pending"', async () => {
    const action = { type: setUser.pending.type }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: false,
    })
  })
  it('should setUser set status to "fulfilled"', async () => {
    const action = { type: setUser.fulfilled.type,
      payload: {
        user: {
          name: 'name',
          email: 'email'
        },
      }}
    expect(authReducer(state, action)).toEqual({
      ...state,
      name: 'name',
      email: 'email',
      isError: false,
    })
  })
  it('should setUser set status to "rejected"', async () => {
    const action = { type: setUser.rejected.type, payload: { message: 'errMsg' } }
    expect(authReducer(state, action)).toEqual({
      ...state,
      isError: true,
      errorMsg: 'errMsg'
    })
  })
})
