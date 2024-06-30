///<reference types="Cypress" />
describe('E2E Test Suite', () => {
    it('E2E test on GREENKART for demonstration', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //fixture
        cy.get('.search-keyword').type('ca')
        cy.get('.search-button').click()
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
        //cart product based on product name
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const vegName = $el.find('h5 b').text()
            if (vegName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
        cy.get("[alt='Cart']").click()
        cy.contains('PROCEED TO CHECKOUT').click()
        //promo added
        cy.get('.promoCode').type('rahulshettyacademy')
        cy.get('.promoBtn').click() 
        cy.wait(3000) 
        cy.get('.promoInfo').should('have.text', 'Code applied ..!')
        cy.contains('Place Order').click()
        cy.get('select').select('Bangladesh').invoke("val").should("eq", "Bangladesh")
        cy.get('.chkAgree').click()
        cy.get('button').click()
        //resolving jquery command
        // cy.get('[style="color:green;font-size:25px"]').then(function (ele) {
        //     cy.log(ele.text())
        // })
        cy.get('[style="color:green;font-size:25px"]').should('contain', 'Thank you')
    })

})