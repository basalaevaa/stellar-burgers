import { TIngredient, TOrder } from '@utils-types';

export const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const main: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const sauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const order: TOrder = {
  _id: '66a62f73119d45001b4fc1e3',
  status: 'done',
  name: 'Краторный spicy био-марсианский бургер',
  createdAt: '2024-08-01T22:25:55.995Z',
  updatedAt: '2024-08-01T22:25:56.499Z',
  number: 48090,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942'
  ]
};

export const mockStates = {
  pending: {
    isLoading: true
  },
  fulfilled: {
    orders: [order],
    total: 1,
    totalToday: 1
  },
  rejected: {
    isLoading: false,
    error: 'Ошибка'
  }
};
