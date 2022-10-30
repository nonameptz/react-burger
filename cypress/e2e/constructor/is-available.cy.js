describe('Constructor Page', () => {
  it('is loaded', () => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('/')
  })
})
