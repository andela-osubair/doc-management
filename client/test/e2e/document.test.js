/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
import faker from 'faker';

const config = require('../../../nightwatch.conf.js');

module.exports = {
  'My Documents Page': function (browser) {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'uyi.sosa@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('nav', 10000)
      .assert.urlEquals('http://localhost:4000/')
      .assert.containsText('h4', 'DASHBOARD')
      .assert.containsText('nav', 'My Documents')
      .waitForElementVisible('li[id="docClick"]', 10000)
      .click('li[id="docClick"]')
      .moveToElement('li[id="docClick"]', 0, 0)
      .mouseButtonClick(0)
      .waitForElementVisible('div[id="card-alert"]', 5000)
      .assert.urlEquals('http://localhost:4000/document')
      .assert.containsText('h4', 'My Documents')
      .assert.containsText('div[id="card-alert"]',
      'INFO : You have 3 Documents')
      .assert.elementPresent('div[id="addBtnDiv"]')
      .moveToElement('div[id="addBtnDiv"]', 0, 0)
      .mouseButtonClick(0)
      .waitForElementVisible('input[id=title]', 5000)
      .waitForElementVisible('input[id=title]', 10000)
      .waitForElementVisible('div', 'fr-element')
      .waitForElementVisible('div', 'fr-view')
      .waitForElementVisible('select[id="mySelectBox"]')
      .setValue('input[id=title]', faker.company.catchPhrase())
      .setValue('div.fr-element', faker.lorem.paragraph())
      .setValue('select[id="mySelectBox"]', 'public')
      .click('input[type="submit"]')
      .waitForElementVisible('div[id="card-alert"]', 5000)
      .waitForElementVisible('div[id="card-alert"]', 10000)
      .assert.containsText('div[id="card-alert"]',
      faker.company.catchPhrase())
      .end();
  }
};
