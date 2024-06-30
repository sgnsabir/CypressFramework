///<reference types="cypress"/>

const { readFile } = require('fs')
const neatCSV = require('neat-csv')

let productList = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO']
describe('Login Bypass', () => {
    it('Logged in through generated token from local storage and end to end validation', async () => {
        cy.login()
        let username = 'sabir000'
        //Add to cart
        
        productList.forEach(product => cy.productAddToCart(product))

        cy.get("[routerlink*='cart']").click()

        //price validation
        let expected = 0
        cy.get('.prodTotal').find('p').each(($el) => {
            const amount = $el.text().split(" ")[1]
            const res = parseInt(amount.trim())
            expected += res
        }).then(() => expected)

        cy.get(':nth-child(2)> .value').each(($el)=> {
            const amount = $el.text().split("$")[1]
            let actual = parseInt(amount.trim())
            console.log(actual)
            expect(expected).to.equal(actual)
        })


        cy.get(".totalRow button").click({ force: true })
        cy.get("a.action__submit").click()
        //confirmPurchase
        cy.get("#toast-container").should('include.text', 'Please Enter Full')
        cy.get('[placeholder="Select Country"]').type('Nor')
        cy.contains("Norway").click()
        cy.get("a.action__submit").click()
        //Purchase validation
        cy.wait(2000) // due to practice page is slow
        cy.get('.order-summary button').contains('CSV').click()
        cy.wait(3000) // wait till file is available

        const projetPath = Cypress.config("fileServerFolder")        
        cy.readFile(projetPath + `\\cypress\\downloads\\order-invoice_${username}.csv`)
            .then(async(text)=>{
                const csv = await neatCSV(text)
                console.log("Number of rows in csv: ", csv.length)
                const csvProductNames = csv.map(row => row["Product Name"])
                productList.forEach(product => {
                    expect(csvProductNames.includes(product)).to.be.true
                })
        })
        //to find only one product
        cy.readFile(filePath).then(function (text){
            expect(text).to.include('ZARA COAT 3')
        })
        
        //validation in order history page, just to check products are available in the history
        cy.get("label[routerlink*='myorders']").click()
        productList.forEach(product => cy.findProduct(product))
    })
})