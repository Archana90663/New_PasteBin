describe('Tests Non-Logged in User Paste Permissions', function () {
  it('Checks that a Non-Logged in user has limited paste permissions', function () {
    // Verify User not logged in
    cy.visit('http://localhost:4200/loginpage')

    // If button asks to Continue with Google then user is logged out
    cy.get('button').contains("Continue With Google")

    /*/ Fill out the body of the paste
    cy.get('#richtexteditor_1007234207_0').type('This is the body')

    // Fill out the date of the paste
    cy.get('#mat-input-1').type('2022-04-03T08:30')

    // Select paste type
    cy.get('#mat-select-0').click()
    cy.contains('Unlisted').click()

    // Submit paste
    cy.get('#submitButton').click()

    // Refresh page to prove persistance
    cy.reload()*/
  })
})