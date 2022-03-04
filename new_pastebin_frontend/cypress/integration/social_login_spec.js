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
    
    it('Tests if Login page updates to Logout', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Check User Details Exist
        cy.get('#firstname')
        cy.get('#lastname')
        cy.get('#email')

        // Click Logout button
        cy.get('#logoutbutton').click()
    })

    it('Tests if User Info Updates', function () {
        cy.visit('http://localhost:4200/loginpage')

        // Click Login Button
        cy.get('#loginbutton').click()

        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A4200%3Fid%3Dauth667444&response_type=permission id_token&scope=email profile openid&openid.realm&include_granted_scopes=true&client_id=1034579701724-528o8e1fg6tp9shf1qj0ius2o09as4i4.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A4200&fetch_basic_profile=true&gsiwebsdk=2&flowName=GeneralOAuthFlow';
            }).as("popup")

        })
        
        cy.visit('http://localhost:4200/loginpage')

        // Check User Details Are Updated
        cy.get('#firstname').should("not.equal", "undefined")
        cy.get('#lastname').should("not.equal", "undefined")
        cy.get('#email').should("not.equal", "undefined")

        // Click Logout button
        cy.get('#logoutbutton').click()
    })
})

/*const {GoogleSocialLogin} = require('cypress-social-logins').plugins

module.exports = (on, config) => {
  on('task', {
    GoogleSocialLogin: GoogleSocialLogin
  })
}

describe('Login', () => {
    it('Login through Google', () => {
      const username = Cypress.env('googleSocialLoginUsername')
      const password = Cypress.env('googleSocialLoginPassword')
      const loginUrl = Cypress.env('loginUrl')
      const cookieName = Cypress.env('cookieName')
      const socialLoginOptions = {
        username: username,
        password: password,
        loginUrl: loginUrl,
        headless: true,
        logs: false,
        loginSelector: '[href="/auth/auth0/google-oauth2"]',
        postLoginSelector: '.account-panel'
      }
  
      return cy.task('GoogleSocialLogin', socialLoginOptions).then(({cookies}) => {
        cy.clearCookies()
  
        const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure
          })
  
          Cypress.Cookies.defaults({
            preserve: cookieName
          })
        }
      })
    })
  })*/