// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsUser', () => {
  cy.request({
    url: 'http://localhost:8090/oauth/token',
    method: 'POST',
    headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic cHB2b3Rpbmc6I0Fza0hpbTE5NzA='},
    body: 'password=123456&username=user&grant_type=password'
  }).then(response => {
    debugger
    return { 'access_token': 'abcd123456789', 'token_type': 'bearer', 'refresh_token': 'efgh123456789', 'expires_in': 43199}
  })
})

Cypress.Commands.add('loginAsAdmin', () => {
  cy.request({
    url: 'http://localhost:8090/oauth/token',
    method: 'POST',
    headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic cHB2b3Rpbmc6I0Fza0hpbTE5NzA='},
    body: 'password=123456&username=admin&grant_type=password'
  }).then(response => {
    debugger
    return { 'access_token': 'abcd123456789', 'token_type': 'bearer', 'refresh_token': 'efgh123456789', 'expires_in': 43199}
  })
})
