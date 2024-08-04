import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredientState } from '@utils-types';

export const initialState: TIngredientState = {
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

export const ingredientsSlice = createSlice({
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
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong'; // Преобразование ошибки в строку
      });
  }
});

export default ingredientsSlice.reducer;
