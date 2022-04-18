describe('General Tests for Textpage Component', function () {
    it('Checks Paste Data Integrity', function () {
        // Create a paste and see if it is the same in the Homepage
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('Text Page Test')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('python').click()
        cy.get('#mat-select-value-3').click()
        cy.contains('Public').click()
        cy.pause() // Added to fill out the body
        cy.get('#submitButton').click()

        // Checks for it in the homepage
        cy.visit('http://localhost:4200/')
        cy.get('#searchbar').type("Text Page Test")
        cy.get('#searchbarsubmit').click()
        cy.contains("Text Page Test")
        cy.contains("print('Text Page Test Body')")
    })

    it('Checks Text Page Has Proper Info', function () {
        // Visit Paste Page
        cy.visit('http://localhost:4200/textpage?id=f076270d-bb4b-4097-b216-29cba8832ab1')
        cy.contains("Shiba Inu") // Username
        cy.contains("@shb") // UserID
        cy.contains("Apr 18, 2022") // Date
        cy.contains("Text Page Test") // Title
        cy.contains(print('Text Page Test Body')) // Body
    })
})