describe('Tests Logged in User Paste Permissions', function () {
  it('Checks that a Logged in user has all paste permissions', function () {
    // Verify User is logged in
    cy.visit('http://localhost:4200/loginpage')
    cy.pause()
    cy.get('button').contains("Continue With Google").should('not.exist')

  })
})