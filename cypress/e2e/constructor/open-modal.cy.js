describe('Constructor Page - Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:3000/');
  });

  it('Should open and close modal (esc) and have content', () => {
    //open modal
    cy.get('[data-testid=draggable_element_buns_1]').trigger('click');
    cy.get('#react-modals').should('have.class', 'show');

    cy.get('[data-testid=ingredients-modal]').as('ingModal');
    cy.get('@ingModal').find('p').contains('Флюоресцентная булка R2-D3');
    cy.get('@ingModal').find('img')
      .invoke('attr', 'src')
      .should('eq', 'https://code.s3.yandex.net/react/code/bun-01-large.png')

    //close modal
    cy.get('body').type('{esc}');

    cy.get('body').find('#react-modals.show').should('not.exist')
  })


  it('Should open and close modal (click)', () => {
    //open modal
    cy.get('[data-testid=draggable_element_buns_0]').trigger('click');
    cy.get('#react-modals').should('have.class', 'show');

    //close modal
    cy.get('#react-modals.show').find('svg').trigger('click');

    cy.get('body').find('#react-modals.show').should('not.exist')
  })
})
