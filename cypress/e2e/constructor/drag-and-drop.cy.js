describe('Constructor Page - Drag and drop', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:3000/');
  });

  it('DnD from left to right should working correctly - buns first', () => {
    cy.get('[data-testid=draggable_element_buns_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_bun]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 2)

    cy.get('[data-testid=draggable_element_sauces_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');
    cy.get('[data-testid=draggable_element_sauces_3]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');
    cy.get('[data-testid=draggable_element_mains_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 5)

    cy.get('[data-testid=draggable_element_mains_2]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 6)

    cy.get('[data-testid=draggable_element_mains_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 7)
  })


  it('DnD from left to right should working correctly - ingredients first', () => {
    cy.get('[data-testid=draggable_element_sauces_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 1)

    cy.get('[data-testid=draggable_element_buns_1]').trigger('dragstart');
    cy.get('[data-testid=drop_area_bun]').trigger('drop');
    cy.get('[data-testid=draggable_element_sauces_3]').trigger('dragstart');
    cy.get('[data-testid=drop_area_ingredients]').trigger('drop');

    cy.get('.constructor-element').should('have.length', 4)
  })
})
