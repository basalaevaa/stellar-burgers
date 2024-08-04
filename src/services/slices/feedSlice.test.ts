import feedReducer, { initialState, getFeeds } from './feedSlice';
import { mockStates } from './mocks';

describe('Reducer для фида', () => {
  it('должен установить isLoading в true при запуске pending', () => {
    const action = { type: getFeeds.pending.type };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      ...mockStates.pending
    });
  });

  it('должен обновить состояние с заказами и количеством при успешном fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockStates.fulfilled
    };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      ...mockStates.fulfilled
    });
  });

  it('должен установить isLoading в false и показать сообщение об ошибке при неудачном rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      ...mockStates.rejected
    });
  });
});
