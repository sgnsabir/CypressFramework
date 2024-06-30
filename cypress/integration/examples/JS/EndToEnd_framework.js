///<reference types="Cypress" />
import HomePage from "../../pageObjects/angularShop/HomePage"
import ProductPage from "../../pageObjects/angularShop/ProductPage"
import CheckoutPage from "../../pageObjects/angularShop/CheckoutPage"
import ConfirmPurchase from "../../pageObjects/angularShop/ConfirmPurchase"


describe('End to End Framework', () => {
  // before(function () {
  //   cy.visit("https://rahulshettyacademy.com/angularpractice/")
  // })
    const homePage = new HomePage()
    const productPage = new ProductPage()
    const checkoutPage = new CheckoutPage()
    const confirmPurchase = new ConfirmPurchase()

  beforeEach(function () {
    //runs once before all tests in the block
    cy.fixture('testData').then(function (data) {
      this.data = data
    })
  })
  
  it('Registration page validation', function () {
    cy.visit(Cypress.env('url')+"/angularpractice/")
    homePage.getNameEditField().type(this.data.name)
    homePage.getNameEditField().should('have.attr', 'minlength', '2')
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)
    homePage.getEmailEditField().type(this.data.email)
    homePage.getPasswordEditField().type(this.data.password)
    homePage.getExampleCheckBox().check()
    homePage.getGender().select(this.data.gender)
    homePage.getEntrepreneur().should('be.disabled')
    homePage.getStudent().click()
    //YYYY-MM-DD
    homePage.getDataInputField().type('2000-09-13')
    homePage.getSubmitButton().click()
    homePage.getSuccessMessage().should('contain', 'Success!')
    //EtoE
    homePage.getShopTab().click()
  })

  it('product add to cart', function () {    
    cy.visit(Cypress.env('url')+"/angularpractice/shop")
    this.data.productName.forEach((element) => cy.selectProduct(element));
    productPage.checkoutButton().click()

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
    confirmPurchase.selectCountry("Nor", "Norway")
    confirmPurchase.confirmTerms().click()
    confirmPurchase.purchaseButton().click()
    confirmPurchase.confirmMessage().should('contain', 'Success!')
  })
})