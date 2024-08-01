describe('Тестирование /api/ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('Тестирование добавления булок и ингредиентов', () => {
    cy.request('/api/ingredients');

    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-top]')
      .contains('Краторная булка N-200i (верх)')
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');

    cy.get('[data-cy=constructor-bun-bottom]')
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
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('modal').should('not.exist');
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('modal').should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
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
    cy.visit('http://localhost:4000');
  });

  it('Создание и проверка заказа', () => {
    // Сборка бургера
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();

    // Клик по кнопке «Оформить заказ»
    cy.get('[data-cy=order-result] button').click();

    // Модальное окно открыто, проверка номера заказа, закрытие модального окна
    cy.get('[data-cy=order-number]').contains('48090').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    // Конструктор пуст
    cy.get('[data-cy=constructor]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
