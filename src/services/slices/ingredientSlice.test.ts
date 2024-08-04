import { TIngredient } from '@utils-types';
import {
  ingredientsSlice,
  initialState,
  loadIngredients
} from './ingredientSlice';
import { bun, main, sauce } from './mocks';

describe('slice ингредиентов', () => {
  const mockIngredients: TIngredient[] = [bun, main, sauce];

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const testState = (action: any, expectedState: any) => {
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  };

  it('должен установить isLoading в true при pending', () => {
    testState(
      { type: loadIngredients.pending.type },
      {
        isLoading: true,
        ingredients: [],
        buns: [],
        sauces: [],
        mains: [],
        error: null
      }
    );
  });

  it('должен загрузить ингредиенты при fulfilled', () => {
    testState(
      {
        type: loadIngredients.fulfilled.type,
        payload: mockIngredients
      },
      {
        isLoading: false,
        ingredients: mockIngredients,
        buns: [bun],
        sauces: [sauce],
        mains: [main],
        error: null
      }
    );
  });

  it('должен установить ошибку при rejected', () => {
    testState(
      {
        type: loadIngredients.rejected.type,
        error: { message: 'Не удалось загрузить' }
      },
      {
        isLoading: false,
        ingredients: [],
        buns: [],
        sauces: [],
        mains: [],
        error: 'Не удалось загрузить'
      }
    );
  });
});
