import { expect, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('Проверка правильной инициализации rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const initialState = store.getState();
    const expectedInitialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual(expectedInitialState);
  });
});
