describe('Checks if a user is logged in', function () {
    it('Checks Login Page', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Programatically Login to the app
        // The workaround is to manually intervene using the Electron94 browser to login
        // The page will redirect to the login page and then just verify if there is a button to continue with Google
        // Should be cleaned up in the next sprint
        cy.pause()

        // Refresh page to update logged info
        cy.visit('http://localhost:4200/loginpage')
        cy.reload()

        // Check the user is logged in
        cy.get('button').contains("Continue With Google").should('not.exist')
    })
})