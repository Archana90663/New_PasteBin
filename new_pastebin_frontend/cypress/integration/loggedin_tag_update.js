describe('Tests Logged in User Paste Permissions', function () {
  it('Checks that a Logged in user has all paste permissions', function () {
    // Verify User is logged in
    cy.visit('http://localhost:4200/loginpage')
    cy.pause()
    cy.get('button').contains("Continue With Google").should('not.exist')

    // Verify we have all options available in pastes
    cy.visit('http://localhost:4200/submitpage')
    cy.get('#mat-select-0').click()
    cy.contains('Public')
    cy.contains('Private')
    cy.contains('Unlisted')
  })
})