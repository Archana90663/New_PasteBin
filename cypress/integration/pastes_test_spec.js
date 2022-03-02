describe('Pastes Test', function () {
    it('Creates a Public Paste', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is a public paste').should("have.value", "This is a public paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-01T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Public').click()

        // Submit paste
        cy.get('#submitButton').click()
    })

    it('Creates a Private Paste', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is a private paste').should("have.value", "This is a private paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-02T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Private').click()

        // Submit paste
        cy.get('#submitButton').click()

        // Refresh page to prove persistance
        cy.reload()
    })

    it('Creates an Unlisted Paste', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the paste
        cy.get('#mat-input-0').type('This is an unlisted paste').should("have.value", "This is an unlisted paste")

        // Fill out the body of the paste
        cy.get('#richtexteditor_1007234207_0').type('This is the body')

        // Fill out the date of the paste
        cy.get('#mat-input-1').type('2022-04-03T08:30')

        // Select paste type
        cy.get('#mat-select-0').click()
        cy.contains('Unlisted').click()

        // Submit paste
        cy.get('#submitButton').click()

        // Refresh page to prove persistance
        cy.reload()
    })

    it('Verifies Home Page just shows Public Pastes', function () {
        cy.visit('http://localhost:4200')

        // See if there are any Unlisted Pastes in the Home Page
        cy.contains('This is an unlisted paste').should("not.exist")

        // See if there are any Private Pastes in the Home Page
        cy.contains('This is an private paste').should("not.exist")
    })
})