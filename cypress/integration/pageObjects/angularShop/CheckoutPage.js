class CheckoutPage {
    subTotalPrice() {
        return cy.get("tr td:nth-child(4) strong")
    }
    totalPrice() {
        return cy.get("h3 strong")
    }

    checkoutButton() {
        return cy.contains("Checkout")
    }
}
export default CheckoutPage
