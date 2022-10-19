import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import API_DOMAIN from "../../constants/apiConstant";
import {
  initialAuthState as initialState
} from '../../utils/initStates';
import checkResponse from '../../utils/checkResponse';
import {getCookie, setCookie, deleteCookie} from '../../utils/cookie';
import {AppDispatch} from "./root";

export const forgetPassword = createAsyncThunk(
  'auth/forget-password',
  async (email, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      await checkResponse(response);
      return true;
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Ошибка при восстановлении пароля. Попробуйте еще раз.'
      })
    }
  }
);

export const resetPassword = createAsyncThunk<boolean, {password:string, token:string}, any>(
  'auth/reset-password',
  // @ts-ignore
  async ({password, token}, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
      });
      await checkResponse(response);
      return true;
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Ошибка при восстановлении пароля. Попробуйте еще раз.'
      })
    }
  }
);

export const register = createAsyncThunk<{user: {name:string, email:string}, refreshToken:string, accessToken:string, message?:string }, {password:string, token:string, email:string}, any>(
  'auth/register',
  // @ts-ignore
  async ({password, name, email}, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, name, email })
      });
      return await checkResponse(response);
    } catch (error) {
      thunkApi.rejectWithValue({
        message: 'Ошибка при регистрации. Попробуйте еще раз.'
      })
    }
  }
);


export const login = createAsyncThunk<{user: {name:string, email:string}, refreshToken:string, accessToken:string, message?:string }, {password:string, token:string, email:string}, any>(
  'auth/login',
  // @ts-ignore
  async ({password, email}, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
      });
      const data = await checkResponse(response)
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: error === 'Ошибка: 401' ? 'Неверный логин/пароль' : error
      })
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem('refreshToken');
      const response = await fetch(`${API_DOMAIN}api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      const data = await checkResponse(response)
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Ошибка при логине. Попробуйте еще раз.'
      })
    }
  }
);

export const refreshTokenRequest = () => {
  return fetch(`${API_DOMAIN}api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse)
}

export const refreshToken = (afterRefresh:()=>{}) => (dispatch:AppDispatch) => {
  refreshTokenRequest()
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken, 2);
      dispatch(afterRefresh);
    })
};

export const getUser = createAsyncThunk<{user: {name:string, email:string}, refreshToken:string, accessToken:string, message?:string }, any, any>(
  'auth/get-user',
  //@ts-ignore
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('accessToken')
        },
      });
      const data = await checkResponse(response)
      return data;
    } catch (error:any) {
      if (error.message === 'jwt expired') {
        //@ts-ignore
        thunkApi.dispatch(refreshToken(getUser()));
      }
      return thunkApi.rejectWithValue({
        message: 'Ошибка при получение данных о пользователе.'
      })
    }
  }
);

export const setUser = createAsyncThunk<{user: {name:string, email:string}, refreshToken:string, accessToken:string, message?:string }, any, any>(
  'auth/set-user',
  // @ts-ignore
  async ({name, email}, thunkApi) => {
    try {
      const response = await fetch(`${API_DOMAIN}api/auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify({name, email})
      });
      const data = await checkResponse(response)
      return data;
    } catch (error:any) {
      if (error.message === 'jwt expired') {
        // @ts-ignore
        thunkApi.dispatch(refreshToken(getUser()));
      }
      return thunkApi.rejectWithValue({
        message: 'Ошибка при обновлении данных о пользователе.'
      })
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStateUserName(state, action) {
      state.name = action.payload.name;
    },
    setStateEmail(state, action) {
      state.email = action.payload.email;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken, 2);
      })
      .addCase(register.rejected, (state, action:{payload:any}) => {
        state.isError = true;
        if (action.payload?.message) {
          state.errorMsg = action.payload?.message;
        }
      });

    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken, 2);
          state.isLoggedIn = true;
        } else {
          state.isError = true;
          state.errorMsg = 'Ошибка авторизации';
        }
      })
      .addCase(login.rejected, (state, action:{payload:any}) => {
        state.isError = true;
        if (action.payload?.message?.message) {
          state.errorMsg = action.payload?.message?.message;
        }
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.name = initialState.name;
        state.email = initialState.email;
        localStorage.removeItem('refreshToken');
        state.isError = false;
        state.errorMsg = '';
        state.isLoggedIn = false;
        deleteCookie('accessToken');
      })
      .addCase(logout.rejected, (state, action:{payload:any}) => {
        state.isError = true;
        if (action.payload?.message) {
          state.errorMsg = action.payload?.message;
        }
      });

      builder
        .addCase(getUser.pending, (state) => {
          state.isError = false;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.isLoggedIn = true;
          state.isError = false;
          state.errorMsg = '';
        })
        .addCase(getUser.rejected, (state, action:{payload:any}) => {
          state.isError = true;
          if (action.payload?.message) {
            state.errorMsg = action.payload?.message;
          }
        });

      builder
        .addCase(setUser.pending, (state) => {
          state.isError = false;
        })
        .addCase(setUser.fulfilled, (state, action) => {
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.isError = false;
          state.errorMsg = '';
        })
        .addCase(setUser.rejected, (state, action:{payload:any}) => {
          state.isError = true;
          if (action.payload?.message) {
            state.errorMsg = action.payload?.message;
          }
        });
}})

export const { setStateUserName, setStateEmail } = authSlice.actions

export default authSlice.reducer;
