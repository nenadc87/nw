const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');   
Given('I open an Amazon web- page', function () {
  return client.url('http://amazon.com').waitForElementVisible('body', 1000);
});

Given('I login with user {string} and password {string}', function (username, password) {
  

  return client
        .moveToElement('#nav-link-accountList',10,10)
        .waitForElementVisible('#nav-al-container')
        .click('#nav-flyout-ya-signin span.nav-action-inner')
        .waitForElementVisible('.a-icon.a-icon-logo', 5000)
        .setValue('input[type="email"]', username)
        .click('span#continue')
        .waitForElementVisible('label[for=ap_password]',15000)
        .setValue('input[type=password]', password)
        .click('#signInSubmit')
      // .click(document.querySelectorAll('#nav-link-accountList'))
      //  .waitForElementVisible('#nav-al-title',5000);
    //    .useXpath()
    //    .waitForElementVisible($x(signInButtonPath),10000)
        //.click($x(signInButtonPath));

 

  
});


Then('I am logged in', function () {
  // Write code here that turns the phrase above into concrete actions
  return client
            .assert.containsText('div.nav-line-1-container .nav-line-1','Hello, Test');
});

