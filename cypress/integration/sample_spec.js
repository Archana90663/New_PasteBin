describe('My First Test', function () {
    it('Creates a Paste', function () {
        cy.visit('http://localhost:4200/submitpage')

        // Fill out the title of the post
        cy.get('#mat-input-0').type('This is the title')

        // Fill out the date of the post
        cy.get('#mat-input-1').type('2022-04-01T08:30')
    })
})