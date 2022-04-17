describe('Checks if a paste userID is the same as the user that created it', function () {
    it('Checks userID on Paste', function () {
        // Create the paste
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('This is a test public paste')
        cy.get('ngx-monaco-editor').type('This is the body')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()
        cy.get('#submitButton').click()

        // Once paste created go to homepage
        cy.visit('http://localhost:4200')
        cy.contains('Welcome to PasteBin 2.0!')
        cy.contains('Shiba Inu')
        cy.contains('This is a test public paste')
    })
})