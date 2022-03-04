describe('Tests Social Login', function () {
    it('Tests if Login option pops-up', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Click Login Button
        cy.get('#loginbutton').click()

        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A4200%3Fid%3Dauth667444&response_type=permission id_token&scope=email profile openid&openid.realm&include_granted_scopes=true&client_id=1034579701724-528o8e1fg6tp9shf1qj0ius2o09as4i4.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A4200&fetch_basic_profile=true&gsiwebsdk=2&flowName=GeneralOAuthFlow';
            }).as("popup")

        })
    })

    it('Tests if Redirects to Home Page', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Click Login button
        cy.get('#loginbutton').click()

        cy.url().should('eq', 'http://localhost:4200/')
    })

    // Need to pass through login features
    // Need to test logout
})