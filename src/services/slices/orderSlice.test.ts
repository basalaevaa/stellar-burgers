import { TOrderState } from '@utils-types';
import orderReducer, {
  getOrderByNumber,
  orderBurger,
  resetOrderState,
  setOrderLoading,
  initialState
} from './orderSlice';
import { order } from './mocks';

describe('Тесты редуктора orderSlice', () => {
  it('должен установить loading в true при ожидании getOrderByNumber', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обновить данные заказа при успешном выполнении getOrderByNumber', () => {
    const action = { type: getOrderByNumber.fulfilled.type, payload: order };
    const state = orderReducer(initialState, action);
    expect(state.order).toEqual(order);
    expect(state.loading).toBe(false);
  });

  it('должен обработать ошибку при неудачном выполнении getOrderByNumber', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка получения заказа' }
    };
    const state = orderReducer(initialState, action);
    expect(state.order).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка получения заказа');
  });

  it('должен установить orderLoading в true при ожидании orderBurger', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.orderLoading).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('должен сохранить данные пользовательского заказа при успешном выполнении orderBurger', () => {
    const action = { type: orderBurger.fulfilled.type, payload: order };
    const state = orderReducer(initialState, action);
    expect(state.userOrder).toEqual(order);
    expect(state.orderLoading).toBe(false);
  });

  it('должен сохранить orderError при неудачном выполнении orderBurger', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: 'Ошибка при создании заказа' }
    };
    const state = orderReducer(initialState, action);
    expect(state.userOrder).toBeNull();
    expect(state.orderLoading).toBe(false);
    expect(state.orderError).toBe('Ошибка при создании заказа');
  });

  it('должен сбросить состояние заказа при вызове resetOrderState', () => {
    const action = { type: resetOrderState.type };
    const modifiedState: TOrderState = {
      ...initialState,
      order: order,
      userOrder: order,
      orderLoading: true,
      orderError: 'Ошибка'
    };
    const state = orderReducer(modifiedState, action);
    expect(state.order).toBeNull();
    expect(state.userOrder).toBeNull();
    expect(state.orderLoading).toBe(false);
    expect(state.orderError).toBeNull();
  });

  it('должен обновить значение loading с помощью setOrderLoading', () => {
    const action = { type: setOrderLoading.type, payload: true };
    const state = orderReducer(initialState, action);
    expect(state.orderLoading).toBe(true);
  });
});
