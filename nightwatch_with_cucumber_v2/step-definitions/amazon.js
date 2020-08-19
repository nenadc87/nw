const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');   
Given('I open an Amazon web- page', function () {

  

  return client.url('http://amazon.com').waitForElementVisible('body', 1000);
});

Given('I login with user {string} and password {string}', async function (username, password) {
  // await client.elements('css selector','li.feed-carousel-card',function (result) {
  //   console.log(result.value);
  //   result.value.forEach(function (prop) {
  //       const firstKey = 0;
  //       const keyOfElement = Object.keys(prop)[firstKey];
  //       console.log(prop[keyOfElement]);
  //        client.elementIdAttribute(prop[keyOfElement], 'namespaceURI', function (namespaceURI) {
  //          console.log(namespaceURI.value)
  //        });
  //   });
  // });
  

  return client
        //.moveToElement('#nav-link-accountList',10,10)
        .execute('var elements = document.getElementsByClassName("nav-a nav-a-2");' +
        'for(let i = 0;i<elements.length;++i){'+
        'if(elements[i] && elements[i].textContent.toLowerCase().includes("Hello'+
        '".toLowerCase()))'+
        ' elements[i].dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));}')//.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}))
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

