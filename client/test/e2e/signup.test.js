/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
import faker from 'faker';

const config = require('../../../nightwatch.conf.js');

module.exports = {
  'Signup Page': function (browser) {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('body')
      .assert.containsText('span', 'Create an Account')
      .saveScreenshot('doc-man-signup.png')
      .end();
  },

  'Register New User': function (browser) {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('input[name=name]')
      .setValue('input[name=name]', faker.name.findName())
      .setValue('input[name=username]', faker.internet.userName())
      .setValue('input[type=email]', faker.internet.email())
      .setValue('input[type=password]', faker.internet.password())
      .click('input[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/')
      .assert.containsText('h4', 'DASHBOARD')
      .assert.containsText('nav', 'My Documents')
      .assert.containsText('nav', 'Logout')
      .assert.elementNotPresent('#adminTab')
      .assert.cssClassNotPresent('nav', 'admin')
      .end();
  }
};
