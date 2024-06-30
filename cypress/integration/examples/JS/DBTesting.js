///<reference types="Cypress"/>

describe('Database Testing', () => {
    it('test', () => {
        cy.sqlServer("select * from classicmodels").then(function (result){
            console.log(result[0][1])
        })

    })
 })