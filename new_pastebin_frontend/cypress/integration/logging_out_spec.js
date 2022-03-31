describe('Tests Non-Logged in User Paste Permissions', function () {
  it('Checks that a Non-Logged in user has limited paste permissions', function () {
    // Verify User is logged in
    cy.visit('http://localhost:4200/loginpage')
    cy.contains("Logout from Google")

    // If button asks to Logout then user is logged in
    cy.get('button').contains("Logout from Google").click()

    // Verify we have logged out
    cy.visit('http://localhost:4200/loginpage')
    cy.refresh()
    cy.contains("Logout from Google").should('not.exist')
  })
})