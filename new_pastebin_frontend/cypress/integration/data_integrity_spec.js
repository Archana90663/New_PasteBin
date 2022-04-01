describe('Tests Paste Visibility Integrity', function () {
    it('Tests Public Pastes', function () {
        // Create the paste
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('Public Paste Integrity Test')
        cy.get('#richtexteditor_1007234207_0').type('This is the body')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()
        cy.get('#submitButton').click()

        // Once paste created go to homepage
        cy.visit('http://localhost:4200')
        cy.contains('Public Paste Integrity Test')
    })

    it('Tests Private Pastes', function () {
        // Create the paste
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('Unlisted Paste Integrity Test')
        cy.get('#richtexteditor_1007234207_0').type('This is the body')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('Unlisted').click()
        cy.get('#submitButton').click()

        // Once paste created go to homepage
        cy.visit('http://localhost:4200')
        cy.contains('Unlisted Paste Integrity Test').should('not.exist')
    })
    
})