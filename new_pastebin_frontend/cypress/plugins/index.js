/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const {GoogleSocialLogin} = require('cypress-social-logins').plugins

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // ...
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN
  config.env.googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID
  config.env.googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET

  // plugins code ...
  on('task', {
    customLogin(options) {
      async function typeUsername({page, options} = {}) {
        await page.waitForSelector('input[id="username"]')
        await page.type('input[id="username"]', options.username)
      }

      async function typePassword({page, options} = {}) {
        await page.waitForSelector('input[id="password"]')
        await page.type('input[id="password"]', options.password)
        await page.click('button[id="_submit"]')
      }

      return baseLoginConnect(typeUsername, typePassword, null, options)
    }
  })

  return config
}
