const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
         
Given('I open an Amazon web- page', function () {
  return client.url('http://amazon.com').waitForElementVisible('body', 1000);
});

Given('I login with user {string} and password {string}', function (string, string2) {
  
  let signInButtonPath = "//div[@id='nav-flyout-ya-signin']//span[@class='nav-action-inner'][contains(text(),'Sign in')]";
  client.setTimeout(4000);
  
  client.moveTo(document.getElementById("nav-link-accountList"))
        .useXpath()
        .waitForElementVisible($x(signInButtonPath),1000)
        .click($x(signInButtonPath));

 

  return 'pending';
});


Then('I am logged in', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
