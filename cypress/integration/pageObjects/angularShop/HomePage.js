class HomePage {
    getNameEditField() {
    return cy.get("[name='name']:nth-child(2)")
    }
    getTwoWayDataBinding() {
        return cy.get("input[name='name']:nth-child(1)")
    }
    getEmailEditField() {
        return cy.get("[name='email']")
    }
    getPasswordEditField() {
        return cy.get('#exampleInputPassword1')
    }
    getExampleCheckBox() {
        return cy.get('#exampleCheck1')
    }
    getGender() {
        return cy.get('select')
    }
    getStudent() {
        return cy.contains('Student')
    }
    getEmployed() {
        return cy.contains('Employed')
    }
    getEntrepreneur() {
        return cy.get("#inlineRadio3")
    }
    getDataInputField() {
        return cy.get("[type='date']")
    }
    getSubmitButton() {
        return cy.get("[value='Submit']")
    }
    getSuccessMessage() {
        return cy.contains("Success!")
    }
    getShopTab() {
        return cy.contains('Shop')
    }
}
export default HomePage
