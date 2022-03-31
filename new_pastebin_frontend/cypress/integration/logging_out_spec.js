describe('Tests Non-Logged in User Paste Permissions', function () {
  it('Checks that a Non-Logged in user has limited paste permissions', function () {
    // Verify User is logged in
    cy.visit('http://localhost:4200/loginpage')
    cy.contains("Logout from Google")

  })
})