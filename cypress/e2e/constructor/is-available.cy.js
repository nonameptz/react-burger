describe('Constructor Page', () => {
  it('is loaded', () => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:3000')
  })
})
