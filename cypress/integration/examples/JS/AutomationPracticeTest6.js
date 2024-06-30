///<reference types="Cypress" />
describe('My First Test Suite', () => {
  it('My First test case', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    //Handling Mouse Hover

    //cy.get(".mouse-hover-content").invoke('show') //for mouse hover action
    cy.contains('Top').click({ force: true })
    cy.url().should('include', 'top')
    cy.contains('Reload').click({ force: true })
  })

})