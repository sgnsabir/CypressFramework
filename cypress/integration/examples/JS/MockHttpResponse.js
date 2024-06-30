///<reference types="Cypress" />

describe('Mocking http request for fake response', function () {

    it('Validate when only one book present in virtual library', function () {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "BSG",
                        "aisle": "2302"
                    }]
            }).as('bookretrievals')
        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@bookretrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')

        // length of the response array = rows of the table









    })

})