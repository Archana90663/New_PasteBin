describe('Checks if a user is logged in', function () {
    it('Checks Login Page', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Check the user is logged out
        cy.get('button').contains("Continue With Google")

        // Log the user in with test credentials

        // Refresh page to update logged info
        cy.visit('http://localhost:4200/loginpage')
        cy.reload()

        // Check the user is logged in
        cy.get('button').contains("Continue With Google").should('not.exist')
    })
})