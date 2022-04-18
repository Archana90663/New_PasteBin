describe('General Tests for Submitpage Component', function () {
    it('Checks for Null Values', function () {
        // Try to create a paste with an empy Title
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('python').click()
        cy.get('#mat-select-value-3').click()
        cy.contains('Public').click()
        cy.pause() // Added to fill out the body
        cy.get('#submitButton').click()

        // Alert indicating Null body is not acceptable
        cy.contains("Cannot post text with empty title")
    })

    it('Checks Proper Date', function () {
        // Will select an old date
        // Skipping this test since 
        //     this error handling is automatically taken care of in Front-End
    })

    it('Checks Unlisted Paste Validity', function () {
        // Creates Unlisted paste and searches it in the homepage
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-input-0').type('Unlisted Paste1')
        cy.get('#mat-input-1').type('2022-06-03T08:30')
        cy.get('#mat-select-0').click()
        cy.contains('python').click()
        cy.get('#mat-select-value-3').click()
        cy.contains('Unlisted').click()
        cy.pause() // Added to fill out the body
        cy.get('#submitButton').click()

        // Checks for it in the homepage
        cy.visit('http://localhost:4200/')
        cy.get('#searchbar').type("Unlisted Paste1")
        cy.get('#searchbarsubmit').click()
        cy.contains("Unlisted Paste1").should("not.exist")
    })

    it('Selects Different Syntax Highlighting', function () {
        // Will scroll through different highlighting options
        cy.visit('http://localhost:4200/submitpage')
        cy.get('#mat-select-0').click()
        cy.contains('python').click()
        cy.get('#mat-select-0').click()
        cy.contains('apex').click()
        cy.get('#mat-select-0').click()
        cy.contains('ruby').click()
        cy.get('#mat-select-0').click()
        cy.contains('swift').click()
    })
})