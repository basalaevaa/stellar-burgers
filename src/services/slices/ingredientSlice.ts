import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredientState } from '@utils-types';

const initialState: TIngredientState = {
  buns: [],
  sauces: [],
  mains: [],
  ingredients: [],
  isLoading: false,
  error: null
};

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.ingredients = action.payload;
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
        state.mains = action.payload.filter((item) => item.type === 'main');
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default ingredientsSlice.reducer;
