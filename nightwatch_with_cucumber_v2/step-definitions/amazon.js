const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
         
Given('I open an Amazon web- page', function () {
  return client.url('http://amazon.com').waitForElementVisible('body', 1000);
});

Given('I login with user {string} and password {string}', function (string, string2) {
  

  let elem = document.querySelectorAll('#nav-link-accountList');
  /*let elem = ()=>{
    var aTags = document.querySelectorAll('.nav-line-1');
    var searchText = "Hello, Sign in";
    var found = null;

    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].outerText == searchText) {
        found = aTags[i];
        break;
      }
    return found;
    }
  };
  */
 
  return client.waitForElementVisible(document.querySelectorAll('#nav-link-accountList'),5000)
        .click(document.querySelectorAll('#nav-link-accountList'))
        .waitForElementVisible(document.querySelectorAll('#nav-al-title'),5000);
    //    .useXpath()
    //    .waitForElementVisible($x(signInButtonPath),10000)
        //.click($x(signInButtonPath));

 

  
});


Then('I am logged in', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

