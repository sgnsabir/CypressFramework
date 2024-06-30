///<reference types="Cypress" />
describe('My First Test Suite', () => {
    it('My First test case', () => {
        
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Checkbox
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value', 'option1')
        cy.get("[type='checkbox']").check(['option1', 'option3'])

        //Static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        //Dynamic dropdown
        cy.get('#autocomplete').type('ban')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === 'Bangladesh') {
              cy.wrap($el).click()
            }
          })
        cy.get('#autocomplete').should('have.value', 'Bangladesh')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#show-textbox').should('be.visible')

        //select radio button
        cy.get("[value='radio1']").check()
        cy.get("[name='radioButton']").check()
        cy.get("[value='radio1']").should('not.be.checked')
        cy.get("[value='radio3']").should('be.checked')

        //handling pop-up

    })

})