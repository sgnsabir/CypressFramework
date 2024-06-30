/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../pageObjects/angularShop/HomePage"
import ProductPage from "../../../pageObjects/angularShop/ProductPage";
import CheckoutPage from "../../../pageObjects/angularShop/CheckoutPage";
import ConfirmPurchase from "../../../pageObjects/angularShop/ConfirmPurchase";

const homePage = new HomePage()
const productPage = new ProductPage()
const checkoutPage = new CheckoutPage()
const confirmPurchase = new ConfirmPurchase()

let name
Given('I open ECommerce Page', () => {
    cy.visit(Cypress.env('url') + "/angularpractice/")
})

When('I add items to Cart', function() {    
    homePage.getShopTab().click()
    this.data.productName.forEach((element) => cy.selectProduct(element))
    productPage.checkoutButton().click()
})
When('Validate the total prices', () => {
    let expected = 0
    checkoutPage.subTotalPrice().each(($el) => {
        const amount = $el.text()
        const res = parseInt(amount.split(" ")[1].trim())
        expected += res
    }).then(() => expected)

    checkoutPage.totalPrice().then(function (element) {
        const amount = element.text()
        let actual = parseInt(amount.split(" ")[1].trim())
        expect(expected).to.equal(actual)
    })
    checkoutPage.checkoutButton().click()
})

Then('Select the country submit and verify confirmation message', () => {
    confirmPurchase.selectCountry("Nor", "Norway")
    confirmPurchase.confirmTerms().click()
    confirmPurchase.purchaseButton().click()
    confirmPurchase.confirmMessage().should('contain', 'Success!')
})

Given('I open Ecommerce Page', () => {
    cy.visit(Cypress.env('url') + "/angularpractice/")
})


When('I fill the form details', function (dataTable) {
    name = dataTable.rawTable[1][0]
    homePage.getNameEditField().type(name)
    homePage.getEmailEditField().type(dataTable.rawTable[1][1])
    homePage.getPasswordEditField().type("Password1!")
    homePage.getExampleCheckBox().check()
    homePage.getGender().select(dataTable.rawTable[1][2])
    homePage.getStudent().click()
    //YYYY-MM-DD
    homePage.getDataInputField().type('2000-09-13')
    homePage.getSubmitButton().click()
    //EtoE
    
})

Then('validate the forms behaviour', function () {
    homePage.getNameEditField().should('have.attr', 'minlength', '2')
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getEntrepreneur().should('be.disabled')
    homePage.getSuccessMessage().should('contain', 'Success!')
    
})

Then('select the Shop Page', ()=> {
    homePage.getShopTab().click() 
})
