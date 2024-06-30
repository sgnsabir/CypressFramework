///<reference types= "Cypress"/>

describe('Excel manipulation',()=> {
    it('Verify excel upload download', () => {
        const replaceNum = 411;
        const searchText = "Apple";
        cy.visit("https://rahulshettyacademy.com/upload-download-test/index.html");
        cy.get("#downloadButton").click();
        cy.wait(2000)
        const projetPath = Cypress.config("fileServerFolder");
        const FilePath = projetPath + `\\cypress\\downloads\\download.xlsx`;
        cy.task('writeExcelTest', { searchText: searchText, ReplaceText: replaceNum, change: { rowChange: 0, colChange: 2 }, filePath: FilePath});
        cy.get('#fileinput').selectFile(FilePath);
        cy.contains(searchText).parent().parent().find("#cell-4-undefined").should('have.text', replaceNum)
    })
})


