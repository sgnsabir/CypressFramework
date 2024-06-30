///<reference types="Cypress" />
describe('My First Test Suite', () => {
  it('My First test case', () => {
      
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    //handling pop-up
    cy.get('#alertbtn').click()
    cy.on('window.alert', (str) => {
      expect(str).to.equal('Hello , share this practice page and share your knowledge')
    }) 

    cy.get('#confirmbtn').click()
    cy.on('window.confirm', (str) => {
      expect(str).to.equal('Hello , Are you sure you want to confirm?')
    }) 

    })

})