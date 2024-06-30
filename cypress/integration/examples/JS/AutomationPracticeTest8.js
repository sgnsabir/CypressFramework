///<reference types="Cypress" />
import HomePage from "../../pageObjects/HomePage"

describe('End to End Calendar', () => {
  it('Calendar validation', () => {
    const monthNumber = '5'
    const date = '15'
    const year = '2025'
    const expectedList = [monthNumber, date, year]

    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
    cy.get('a[href="#/offers"]').invoke('removeAttr', 'target').click()
    cy.get("[class*='calendar-button']").eq(0).click()
    for (let i = 0; i < 3; i++) {
      cy.get("[class*='labelText--from']").click()
    }
    cy.get("[class*='prev-button']").click()
    cy.get("[class*='next-button']").click()
    cy.contains('2021 – 2030').click()
    cy.contains(year).click()
    cy.get("[class*='view__months'] button").eq(Number(monthNumber)-1).click()
    //cy.get(`[aria-label*='${date}']`).click();
    cy.contains('abbr', date).click()
    //cy.get("[class*='inputGroup'] input").eq(0).should('have.value', '2025-05-15')
    cy.get("[class*='inputGroup__input']").each(($el, index) => {
      cy.wrap($el).invoke('val').should('eq', expectedList[index])
      // cy.wrap($el).invoke('val').then(function (text) {
      //   console.log(text)
      // })
    })

  })
  it('Optimize Calendar validation', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
    cy.get('a[href="#/offers"]').invoke('removeAttr', 'target').click()
    cy.get("[class*='calendar-button']").eq(0).click()
    for (let i = 0; i < 3; i++) {
      cy.get("[class*='labelText--from']").click()
    }
    cy.get("[class*='prev-button']").click()
    cy.get("[class*='next-button']").click()
    cy.contains('2021 – 2030').click()
    cy.contains('2025').click()
    cy.contains('May').click()
    cy.get("[aria-label*='15']").click()
    cy.get("[class*='inputGroup'] input").eq(0).should('have.value', '2025-05-15')

  })


  //isolated test only for practice
  it('some validation practice', function () {
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
    const homePage = new HomePage()
    homePage.getNameEditField().type(this.data.name)
    homePage.getNameEditField().should('have.attr', 'minlength', '2')
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)
    homePage.getEntrepreneur().should('be.disabled')
  })

})