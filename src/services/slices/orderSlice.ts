import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrderState } from '@utils-types';

const initialState: TOrderState = {
  order: null,
  userOrder: null,
  orders: [],
  loading: false,
  error: null,
  orderLoading: false,
  orderError: null
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.order = null;
      state.userOrder = null;
      state.orderLoading = false;
      state.orderError = null;
    },
    setOrderLoading(state, action) {
      state.orderLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.userOrder = action.payload;
        state.orderLoading = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message || 'Failed to place order';
      });
  }
});

export default orderSlice.reducer;
export const { resetOrderState, setOrderLoading } = orderSlice.actions;
