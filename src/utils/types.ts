import { TRegisterData } from '@api';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

export type TOrderState = {
  order: TOrder | null;
  userOrder: TOrder | null;
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderLoading: boolean;
  orderError: string | null;
};

export type TIngredientState = {
  buns: TIngredient[];
  sauces: TIngredient[];
  mains: TIngredient[];
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null;
};

export type TUserState = {
  errorMsg: string | null;
  isAuthVerified: boolean;
  userInfo: TUser | null;
  isUserRequesting: boolean;
  isOrderRequesting: boolean;
  userOrderHistory: TOrder[];
  registrationInfo: TRegisterData | null;
};
