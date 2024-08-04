const testUrl = 'http://localhost:4000';
const selectors = {
  bunIngredients: '[data-cy=bun-ingredients]',
  mainIngredients: '[data-cy=main-ingredients]',
  sauceIngredients: '[data-cy=sauce-ingredients]',
  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorIngredients: '[data-cy=constructor-ingredients]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',
  modals: '#modals',
  modalOverlay: '[data-cy=modal-overlay]',
  orderResultButton: '[data-cy=order-result] button',
  orderNumber: '[data-cy=order-number]',
  constructor: '[data-cy=constructor]',
};

describe('Тестирование /api/ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  it('Тестирование добавления булок и ингредиентов', () => {
    cy.request('/api/ingredients');

    cy.get(selectors.bunIngredients).contains('Добавить').click();
    cy.get(selectors.mainIngredients).contains('Добавить').click();
    cy.get(selectors.sauceIngredients).contains('Добавить').click();

    cy.get(selectors.constructorBunTop)
      .contains('Краторная булка N-200i (верх)')
      .should('exist');

    cy.get(selectors.constructorIngredients)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get(selectors.constructorIngredients)
      .contains('Соус Spicy-X')
      .should('exist');

    cy.get(selectors.constructorBunBottom)
      .contains('Краторная булка N-200i (низ)')
      .should('exist');
  });

  afterEach(() => {
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тестирование работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('modal').should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(selectors.modals)
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(`${selectors.modals} button[aria-label="Закрыть"]`).click();
    cy.get('modal').should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(selectors.modalOverlay).click({ force: true });
    cy.get('modal').should('not.exist');
  });

  afterEach(() => {
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тестирование создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'auth.json' }).as('login');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit(testUrl);
  });

  it('Создание и проверка заказа', () => {
    // Сборка бургера
    cy.get(selectors.bunIngredients).contains('Добавить').click();
    cy.get(selectors.mainIngredients).contains('Добавить').click();
    cy.get(selectors.sauceIngredients).contains('Добавить').click();

    // Клик по кнопке «Оформить заказ»
    cy.get(selectors.orderResultButton).click();

    // Модальное окно открыто, проверка номера заказа, закрытие модального окна
    cy.get(selectors.orderNumber).contains('48090').should('exist');
    cy.get(`${selectors.modals} button[aria-label="Закрыть"]`).click();
    cy.get(selectors.orderNumber).should('not.exist');

    // Конструктор пуст
    cy.get(selectors.constructor)
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get(selectors.constructor)
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get(selectors.constructor)
      .contains('Соус Spicy-X')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
