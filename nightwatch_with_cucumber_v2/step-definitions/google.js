const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
var html_com  = require('../screens/html.com')


Given(/^I open Google's search page$/, () => {
  return client.url('http://google.com').waitForElementVisible('body', 1000);
});

Then(/^the title is "([^"]*)"$/, title => {
  return client.assert.title(title);
});

Then(/^the Google search form exists$/, async () => {
    await client.assert.visible('input[name="q"]');
    await client.assert.visible('input[name="q"]').keys("TESTLOLO");
});

Then('there asdas aksdaksd check if generated', async () => {
    await client.expect.element('#hplogo').to.be.visible;
  });

Given('I opened html.com label for example page', function () {
  return client.url('https://html.com/tags/label/').waitForElementVisible('body', 1000);
});

Then(/^I type "([^"]*)" into Favourite Animal locating the input field with the for attribute of the label$/, async (something) => {
  var inputID = await html_com.getInputIdForFavouriteAnimalInput();
  return client.setValue("#" + inputID, something);
});

Then(/^Check if input really changed to "([^"]*)"$/, async (something) => {
  var inputID = await html_com.getInputIdForFavouriteAnimalInput();
  return client.assert.value("#" + inputID, something)
});