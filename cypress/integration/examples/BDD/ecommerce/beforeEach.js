beforeEach(() => {
    cy.fixture('example').then(function (fdata) {
        this.data = fdata
    })
});