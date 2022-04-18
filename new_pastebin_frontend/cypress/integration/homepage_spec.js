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
    })

    it('Checks Logged out User Functions', function () {
        // Sees if a logged out user can make a private paste
    })

    it('Checks Paste UserID is right', function () {
        // Will create a paste and verify the user in the homepage
    })

    it('Checks Search Works Properly', function () {
        // Will search for a paste created in the home page
    })
})