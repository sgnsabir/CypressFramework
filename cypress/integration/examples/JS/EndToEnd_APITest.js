///<reference types="Cypress" />

describe('EndToEnd API test', function () {
    let isbn = "bcgd"
    let aisle = "0016"
    let ID = isbn + aisle
    it('Add a Book', function () {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with Java",
                "isbn": `${isbn}`,
                "aisle": `${aisle}`,
                "author": "John foe"
            }).then(function (response) {
                expect(response.body).to.have.property('Msg', 'successfully added')
                expect(response.status).to.eq(200)
            })
    })

    it('Get the Book', function () {
        cy.request('POST', `http://216.10.245.166/Library/GetBook.php?ID=${ID}`)
            .then(function (response) {
                expect(response.body).to.be.an('array').that.is.not.empty;
                const book = response.body[0];
    
                expect(book).to.have.property('book_name', 'Learn Appium Automation with Java');
                expect(book).to.have.property('isbn', 'bcgd');
                expect(book).to.have.property('aisle', '16');
                expect(book).to.have.property('author', 'John foe');
                expect(response.status).to.eq(200);
            })
    })

    it('Delete the Book', function () {
        cy.request('DELETE', 'http://216.10.245.166/Library/DeleteBook.php', 
            {
                "ID" : `${ID}`
            }).then(function (response) {
                expect(response.body).to.have.property('msg', 'book is successfully deleted')
                expect(response.status).to.eq(200)
            })
    })









})