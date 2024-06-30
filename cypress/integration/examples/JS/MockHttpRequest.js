///<reference types="Cypress" />

describe('Mocking http request for fake request', function () {

    it('Validate when only one book present in virtual library', function () {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req)=>{
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
                req.continue((res) => {
                    //expect(res.statusCode).to.equal(403)
                })
        }).as("dummyUrl")
        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@dummyUrl')
    })

    it('Application security validation', function () {
        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
        // Intercept before button click       
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=testname";
            return req; // Return the modified request object       
        }).as("dummyUrl");
        cy.get("button[class='btn btn-primary']").click();
        cy.wait('@dummyUrl');
    });


    // length of the response array = rows of the table









})