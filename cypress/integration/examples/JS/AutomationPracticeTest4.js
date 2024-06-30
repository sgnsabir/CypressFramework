///<reference types="Cypress" />
describe('My First Test Suite', () => {
  it('My First test case', () => {
      
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    //handling child window or tab target= 'blank' by removing the target attribute
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    //run command in different domain
    cy.origin('https://www.qaclickacademy.com/', ()=>{
      cy.get("#navbarSupportedContent a[href*='about']").click()
      cy.get(".col-lg-5 h2").should('contain', 'QAClick Academy')
      //cy.go('back').go('back')
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })
    
    //Open new window on click no target attribute


    cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen')
  })
    cy.get('#openwindow').click()
    cy.get('@windowOpen').should('be.calledOnce').then(stub => {
      const url = stub.args[0][0]
      cy.visit(url)
    })
    
  cy.origin('https://www.qaclickacademy.com/', () => {
    cy.url().should('include', 'https://www.qaclickacademy.com/')
    //here we have to do expected operation
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
  })
    
  cy.url().should('include', 'https://rahulshettyacademy.com/AutomationPractice/')

  })

})