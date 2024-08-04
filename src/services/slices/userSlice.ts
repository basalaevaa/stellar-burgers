import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUserState } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const initialUserState: TUserState = {
  errorMsg: null,
  isAuthVerified: false,
  userInfo: null,
  isUserRequesting: false,
  isOrderRequesting: false,
  userOrderHistory: [],
  registrationInfo: null
};

export const verifyUserAuth = createAsyncThunk(
  'auth/verifyUserAuth',
  async () => {
    try {
      const { user } = await getUserApi();
      if (!user) throw new Error('User not authenticated');
      return { user };
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      throw new Error('Failed to verify user authentication');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registrationInfo: TRegisterData) => {
    const response = await registerUserApi(registrationInfo);
    return response;
  }
);

export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

export const getUser = createAsyncThunk('auth/getUser', () => getUserApi());

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });

    if (!data.success) {
      throw new Error('Login failed');
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userInfo = null;
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrderRequesting = true;
        state.errorMsg = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrderHistory = action.payload;
        state.isOrderRequesting = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isOrderRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isUserRequesting = false;
        state.isAuthVerified = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.isUserRequesting = false;
        state.isAuthVerified = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      })
      .addCase(verifyUserAuth.pending, (state) => {
        state.isUserRequesting = true;
        state.errorMsg = null;
      })
      .addCase(verifyUserAuth.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isAuthVerified = true;
        state.isUserRequesting = false;
      })
      .addCase(verifyUserAuth.rejected, (state, action) => {
        state.userInfo = null;
        state.isAuthVerified = false;
        state.isUserRequesting = false;
        state.errorMsg = action.error.message as string;
      });
  }
});

export default userSlice.reducer;
