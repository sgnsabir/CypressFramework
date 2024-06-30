class ProductPage {
    productsTitle() {
        return cy.get("h4.card-title")
    }
    addToCartButton() {
        return cy.get("button.btn.btn-info")
    }
    checkoutButton() {
        return cy.contains("Checkout")
    }
}
export default ProductPage
