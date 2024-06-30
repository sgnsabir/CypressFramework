// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import ProductPage from "../integration/pageObjects/angularShop/ProductPage"
Cypress.Commands.add('selectProduct', (productName) => {
    const productPage = new ProductPage()
    productPage.productsTitle().each(($el, index) => {
        if ($el.text().includes(productName)) {
            productPage.addToCartButton().eq(index).click()
        }
    })
})

Cypress.Commands.add('productAddToCart', (productName) => {    
    cy.get('.card-body').find('h5 b').each(($el, index) => {
        if ($el.text().includes(productName)) {
            cy.get('.card-body button:last-of-type').eq(index).click({ force: true })
            cy.wait(2000)
        }
    })
})

Cypress.Commands.add('findProduct', (productName) => {    
    cy.get('tr').find('td:nth-child(3)').each(($el, index) => {
        let product = $el.text()
        //console.log(product)
        if (product.includes(productName)) {
            expect(product).to.include(productName)
        }
    })
})

Cypress.Commands.add("loginAPI", () => {
    cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login",
        { "userEmail": "", "userPassword": "" })
        .then(function (response) {
            expect(response.status).to.eq(200)
            Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add("login", () => {
    cy.loginAPI().then(function () {
        cy.visit("https://rahulshettyacademy.com/client", {
            onBeforeLoad: function (window) {
                window.localStorage.setItem('token', Cypress.env('token'))
            }
        })
    })
})