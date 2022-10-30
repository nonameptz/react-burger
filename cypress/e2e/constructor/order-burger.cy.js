describe('Constructor Page - order a burger', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept("POST", "api/auth/login", { fixture: "login.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
    cy.visit('/');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should select buns, ingredients and click order, login, open modal and close it', () => {
    cy.get('[data-testid=draggable_element_buns_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_bun]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 2)

    cy.get('[data-testid=draggable_element_sauces_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 3)

    cy.get('[data-testid=button-order-burger]').trigger('click');

    const email = '1@1.com';
    const password = '123';

    cy.get('.input_type_email .input__textfield').type(`${email}{enter}`);
    cy.get('.input_type_password .input__textfield').type(`${password}{enter}`);

    cy.get('[data-testid=button-order-burger]').trigger('click');

    cy.get('#react-modals').should('have.class', 'show');
    cy.get('[data-testid=order-modal]').as('orderModal');

    cy.get('@orderModal').find('[data-testid=order-num]').contains(123)
    cy.get('@orderModal').find('[data-testid=order-text]').contains('Ваш заказ начали готовить')

    //close modal
    cy.get('#react-modals.show')
      .find('*[class^="modal_button"]')
      .find('svg')
      .trigger('click');
    cy.get('body').find('#react-modals.show').should('not.exist')
  })

})
