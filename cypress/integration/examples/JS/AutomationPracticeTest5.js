///<reference types="Cypress" />
describe('My First Test Suite', () => {
  it('My First test case', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    //web table operation
    cy.get("[name='courses'] tr td:nth-child(2)").each(($el, index, $list) => {
      const text = $el.text()
      if (text.includes('Python')) {
        //cy.wrap($el).click()
        cy.get("[name='courses'] tr td:nth-child(2)").eq(index).next().then(function (price) {
          const priceText = price.text()
          expect(priceText).to.equal('25')
        })
      }
    })


  })

})