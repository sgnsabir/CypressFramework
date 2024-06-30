///<reference types="Cypress" />
describe('My First Test Suite', () => {
    it('My First test case', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //fixture
        cy.get('.search-keyword').type('ca')
        cy.get('.search-button').click()
        cy.get('.product:visible').should('have.length', 4)
        cy.get('.products').as('productsLocator')

        cy.get('@productsLocator').find('.product').should('have.length', 4)
        cy.get('@productsLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productsLocator').find('.product').each(($el, index, $list) => {
            const vegName = $el.find('h4.product-name').text()
            if (vegName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
        cy.get('.brand').then(function (logelement) {
            cy.log(logelement.text())
        })
        cy.get('.brand').should('have.text', 'GREENKART')
        cy.get("[alt='Cart']").click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.get('.promoCode').type('rahulshettyacademy')
        cy.get('.promoBtn').click()
        cy.wait(5000)
        cy.get('.promoInfo').should('have.text', 'Code applied ..!')
        cy.get('.amount').eq(1)

        
    })

})