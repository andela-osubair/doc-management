/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Doc Management Title': function (browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .saveScreenshot('doc-man-login.png')
      .end();
  },

  'Login Users': function (browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'oyendah@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('h4')
      .assert.urlEquals('http://localhost:4000/')
      .end();
  },

  'Admin User Dashboard Page': function (browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'oyendah@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('nav', 5000)
      .assert.urlEquals('http://localhost:4000/')
      .assert.containsText('h4', 'DASHBOARD')
      .assert.containsText('nav', 'Doc Management')
      .assert.containsText('nav', 'My Documents')
      .assert.containsText('nav', 'Manage Users')
      .assert.containsText('nav', 'Manage Roles')
      .assert.cssClassPresent('#adminTab', 'admin')
      .assert.containsText('nav', 'Logout')
      .click('nav ul li a#logout')
      .end();
  },

  'Regular Users Dashboard Page': function (browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'uyi.sosa@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('nav', 5000)
      .assert.urlEquals('http://localhost:4000/')
      .assert.containsText('h4', 'DASHBOARD')
      .assert.containsText('nav', 'Doc Management')
      .assert.containsText('nav', 'My Documents')
      .assert.containsText('nav', 'Logout')
      .assert.elementNotPresent('#adminTab')
      .assert.cssClassNotPresent('nav', 'admin')
      .end();
  }
};
