describe('General Tests for Homepage Component', function () {
    it('Checks for Null Values', function () {
        // Try to create a paste with an empy body
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('Empty Body Public Paste')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('python').click()
        cy.get('#mat-select-value-3').click()
        cy.contains('Public').click()
        cy.get('#submitButton').click()

        // Alert indicating Null body is not acceptable
        cy.contains("Cannot post text with empty body")
    })

    it('Check User Login Status', function () {
        // Look at the welcome message in the home page
        cy.visit('http://localhost:4200')
        cy.contains("Welcome to PasteBin 2.0!")
    })

    it('Checks Logged out User Functions', function () {
        // Sees if a logged out user can make a private paste
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-select-value-3').click()
        cy.contains('Private').should("not.exist")
    })

    it('Checks Paste UserID is right', function () {
        // Visits Anonymous paste to verify UserID is correct
        cy.visit('http://localhost:4200/textpage?id=9c29ba69-ed40-4dfb-96a3-891f1c7ff16d')
        cy.contains("Shiba Inu")
    })

    it('Checks Search Works Properly', function () {
        // Will search for a paste created in the home page
        cy.visit('http://localhost:4200/')
        cy.get('#searchbar').type("aaa")
        cy.get('#searchbarsubmit').click()
        cy.contains("aaa")
    })
})