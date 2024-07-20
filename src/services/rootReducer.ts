import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import ingredientsReducer from './slices/ingredientSlice';
import burgerConstructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  orders: orderReducer
});
