import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  initialUserState,
  registerUser,
  loginUser,
  getUser,
  getOrders,
  updateUser,
  logoutUser,
  verifyUserAuth
} from './userSlice';
import { order, registerData } from './mocks';

describe('userSlice', () => {

  const createTestStore = () => {
    return configureStore({
      reducer: {
        user: reducer
      },
      preloadedState: {
        user: initialUserState
      }
    });
  };

  it('должен корректно обрабатывать начальное состояние', () => {
    const store = createTestStore();
    expect(store.getState().user).toEqual(initialUserState);
  });

  it('должен корректно обрабатывать состояние pending для registerUser', () => {
    const store = createTestStore();
    store.dispatch(registerUser.pending('', registerData));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние rejected для registerUser', () => {
    const store = createTestStore();
    const error = new Error('Ошибка регистрации');
    store.dispatch(registerUser.rejected(error, '', registerData));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка регистрации');
  });

  it('должен корректно обрабатывать состояние pending для loginUser', () => {
    const store = createTestStore();
    store.dispatch(
      loginUser.pending('', {
        email: 'test@example.com',
        password: 'password123'
      })
    );
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние rejected для loginUser', () => {
    const store = createTestStore();
    const error = new Error('Ошибка входа');
    store.dispatch(
      loginUser.rejected(error, '', {
        email: 'test@example.com',
        password: 'password123'
      })
    );
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка входа');
  });

  it('должен корректно обрабатывать состояние pending для getUser', () => {
    const store = createTestStore();
    store.dispatch(getUser.pending('', undefined));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние fulfilled для getUser', () => {
    const store = createTestStore();
    store.dispatch(
      getUser.fulfilled(
        { success: true, user: registerData },
        '',
        undefined
      )
    );
    const state = store.getState().user;
    expect(state.userInfo).toEqual(registerData);
    expect(state.isUserRequesting).toBe(false);
    expect(state.isAuthVerified).toBe(true);
  });

  it('должен корректно обрабатывать состояние rejected для getUser', () => {
    const store = createTestStore();
    const error = new Error('Ошибка получения пользователя');
    store.dispatch(getUser.rejected(error, '', undefined));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка получения пользователя');
  });

  it('должен корректно обрабатывать состояние pending для getOrders', () => {
    const store = createTestStore();
    store.dispatch(getOrders.pending('', undefined));
    const state = store.getState().user;
    expect(state.isOrderRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние fulfilled для getOrders', () => {
    const store = createTestStore();
    store.dispatch(getOrders.fulfilled([order], '', undefined));
    const state = store.getState().user;
    expect(state.userOrderHistory).toEqual([order]);
    expect(state.isOrderRequesting).toBe(false);
  });

  it('должен корректно обрабатывать состояние rejected для getOrders', () => {
    const store = createTestStore();
    const error = new Error('Ошибка получения заказов');
    store.dispatch(getOrders.rejected(error, '', undefined));
    const state = store.getState().user;
    expect(state.isOrderRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка получения заказов');
  });

  it('должен корректно обрабатывать состояние pending для updateUser', () => {
    const store = createTestStore();
    store.dispatch(updateUser.pending('', registerData));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние fulfilled для updateUser', () => {
    const store = createTestStore();
    store.dispatch(
      updateUser.fulfilled(
        { success: true, user: registerData },
        '',
        registerData
      )
    );
    const state = store.getState().user;
    expect(state.userInfo).toEqual(registerData);
    expect(state.isUserRequesting).toBe(false);
    expect(state.isAuthVerified).toBe(true);
  });

  it('должен корректно обрабатывать состояние rejected для updateUser', () => {
    const store = createTestStore();
    const error = new Error('Ошибка обновления');
    store.dispatch(updateUser.rejected(error, '', registerData));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка обновления');
  });

  it('должен корректно обрабатывать состояние pending для logoutUser', () => {
    const store = createTestStore();
    store.dispatch(logoutUser.pending('', undefined));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние fulfilled для logoutUser', () => {
    const store = createTestStore();
    store.dispatch(logoutUser.fulfilled(undefined, '', undefined));
    const state = store.getState().user;
    expect(state.userInfo).toBeNull();
    expect(state.isUserRequesting).toBe(false);
    expect(state.isAuthVerified).toBe(false);
  });

  it('должен корректно обрабатывать состояние rejected для logoutUser', () => {
    const store = createTestStore();
    const error = new Error('Ошибка выхода');
    store.dispatch(logoutUser.rejected(error, '', undefined));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка выхода');
  });

  it('должен корректно обрабатывать состояние pending для verifyUserAuth', () => {
    const store = createTestStore();
    store.dispatch(verifyUserAuth.pending('', undefined));
    const state = store.getState().user;
    expect(state.isUserRequesting).toBe(true);
    expect(state.errorMsg).toBeNull();
  });

  it('должен корректно обрабатывать состояние rejected для verifyUserAuth', () => {
    const store = createTestStore();
    const error = new Error('Ошибка проверки');
    store.dispatch(verifyUserAuth.rejected(error, '', undefined));
    const state = store.getState().user;
    expect(state.userInfo).toBeNull();
    expect(state.isAuthVerified).toBe(false);
    expect(state.isUserRequesting).toBe(false);
    expect(state.errorMsg).toBe('Ошибка проверки');
  });
});
