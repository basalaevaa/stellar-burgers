import { expect, describe, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} from './constructorSlice';
import { bun, main, sauce } from './mocks';

describe('constructorSlice', () => {
  it('Добавление булки в конструктор', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });

    // Проверка начального состояния
    const initialState = store.getState().burgerConstructor;
    expect(initialState.bun).toBeNull();

    // Добавление булки и проверка состояния
    store.dispatch(addIngredient(bun));
    const state = store.getState().burgerConstructor;
    expect(state.bun).toEqual(expect.objectContaining(bun));
  });

  it('Добавление начинки в конструктор', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });
    store.dispatch(addIngredient(main));
    store.dispatch(addIngredient(sauce));
    const stateWithIngredients = store.getState().burgerConstructor;
    expect(stateWithIngredients.ingredients).toHaveLength(2);
    expect(stateWithIngredients.ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining(main),
        expect.objectContaining(sauce)
      ])
    );
  });

  it('Удаление ингредиента из конструктора', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });
    const ingredients = [bun, main, sauce];

    ingredients.forEach((ingredient) =>
      store.dispatch(addIngredient(ingredient))
    );
    const initialState = store.getState().burgerConstructor;

    const ingredientToRemove = initialState.ingredients[0];
    store.dispatch(removeIngredient({ id: ingredientToRemove.id }));

    const stateAfterRemoval = store.getState().burgerConstructor;
    expect(stateAfterRemoval.ingredients).toHaveLength(
      initialState.ingredients.length - 1
    );
    expect(stateAfterRemoval.ingredients).not.toContainEqual(
      ingredientToRemove
    );
  });

  it('Перемещение ингредиента вниз', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });
    const ingredients = [bun, main, sauce];

    ingredients.forEach((ingredient) =>
      store.dispatch(addIngredient(ingredient))
    );
    const initialState = store.getState().burgerConstructor;
    const originalOrder = [...initialState.ingredients];

    store.dispatch(moveIngredient({ index: 0, direction: 'down' }));
    const stateAfterMove = store.getState().burgerConstructor;
    expect(stateAfterMove.ingredients[0]).toEqual(originalOrder[1]);
    expect(stateAfterMove.ingredients[1]).toEqual(originalOrder[0]);
  });

  it('Перемещение ингредиента вверх', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });
    const ingredients = [bun, main, sauce];

    ingredients.forEach((ingredient) =>
      store.dispatch(addIngredient(ingredient))
    );
    const initialState = store.getState().burgerConstructor;
    const originalOrder = [...initialState.ingredients];

    store.dispatch(moveIngredient({ index: 0, direction: 'down' }));
    store.dispatch(moveIngredient({ index: 1, direction: 'up' }));
    const stateAfterMove = store.getState().burgerConstructor;
    expect(stateAfterMove.ingredients).toEqual(originalOrder);
  });

  it('Проверка состояния после сброса конструктора', () => {
    const store = configureStore({ reducer: { burgerConstructor: reducer } });
    const ingredients = [bun, main, sauce];

    ingredients.forEach((ingredient) =>
      store.dispatch(addIngredient(ingredient))
    );

    store.dispatch(resetConstructor());

    const stateAfterReset = store.getState().burgerConstructor;
    expect(stateAfterReset.bun).toBeNull();
    expect(stateAfterReset.ingredients).toEqual([]);
  });
});
