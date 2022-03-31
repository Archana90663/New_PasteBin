describe('Tests Non-Logged in User Paste Permissions', function () {
  it('Checks that a Non-Logged in user has limited paste permissions', function () {
    // Verify User not logged in
    cy.visit('http://localhost:4200/loginpage')

    // If button asks to Continue with Google then user is logged out
    cy.get('button').contains("Continue With Google")

    // Verify we do not have Private option available in pastes
    cy.visit('http://localhost:4200/submitpage')
    cy.get('#mat-select-0').click()
    cy.contains('Private').should('not.exist')
  })
})