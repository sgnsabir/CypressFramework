class ConfirmPurchase {
    selectCountry(countryKey, countryName) {
        cy.get("#country").type(countryKey)
        cy.wait(3000)
        cy.contains(countryName).click()
    }
    confirmTerms() {
        return cy.get("[for='checkbox2']")
    }
    purchaseButton() {
        return cy.get("[value='Purchase']")
    }
    confirmMessage() {
        return cy.get("strong")
    }
}
export default ConfirmPurchase
