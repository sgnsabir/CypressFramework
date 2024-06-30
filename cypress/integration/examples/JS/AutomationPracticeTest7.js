///<reference types="Cypress" />
///<reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('Frame Test and grabbing attribute value', () => {
  it('Grab attribute value of child url', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    //grabbing attribute value
    cy.get('#opentab').then(function (el) {
      const url = el.prop('href')
      cy.visit(url)
      cy.origin(url, () => {
        cy.url().should('include', 'https://www.qaclickacademy.com/')
        cy.get("#navbarSupportedContent a[href*='about']").click()
        cy.get(".col-lg-5 h2").should('contain', 'QAClick Academy')
      })
    })
  })

  //Handling iframe
  
  it('iFrame validation', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.frameLoaded("#courses-iframe")
    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    cy.wait(2000)
    cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)

  })

})