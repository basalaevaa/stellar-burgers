import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeedsState } from '@utils-types';

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message ?? 'Unknown error';
      });
  }
});

export default feedSlice.reducer;
