/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  '@disabled': true,
  Search(browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'oyendah@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:4000/')
      .assert.containsText('h4', 'DASHBOARD')
      .waitForElementVisible('ul[id="nav-mobile"]', 10000)
      .waitForElementVisible('nav ul li[id="searchClick"]', 10000)
      .click('li[id="searchClick"]')
      .moveToElement('li[id="searchClick"]', 0, 0)
      .mouseButtonClick(0)
      .waitForElementVisible('div[id=modal2]', 10000)
      .pause(1000)
      .setValue('input[id=search]', 'document')
      .pause(1000)
      .assert.elementPresent('h6[id="searchReasult"]')
      .end();
  },
};
