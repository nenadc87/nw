const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber'); 
const url = 'https://www.billa.at'; 
const productEP ='/produkte/da-komm-ich-her-gurke/00-408966';
         
Given('I open Billa Online Shop page', function () {
  
  return client.url(url)
                .maximizeWindow()
                .waitForElementVisible('body',1000);
});

Given('I\'m loged in on the Billa Page with usename {string} and password {string}', function (username, password) {
//   let button = (client)=>{
//     let buttons =  client.elements('css selector', 'button.button--arrow[type=submit]');
//     for(let i=0;i<buttons.size;++i){
//         if(buttons[i].textContent=="Anmelden")
//           return buttons[i]; 
//     }
//   }
 return client
                .click('.header__user-buttons-item button[aria-label=Anmelden]')
                .waitForElementVisible('div[data-dd-class-if-flapout=account]', 1000)
                .setValue('input[name=Email]', username)
                .setValue('input[name=LoginPassword]',password)
                .click('button.button--arrow[type=submit]')
                //.click(button)
                .waitForElementVisible('.header__account-text')
                .assert.containsText('.header__account-text', 'Mein Konto')
});

When('I search for {string}', function (articleName) {
  
    return client
            .setValue('input[name=searchTerm]',articleName)
            .keys('\uE007')
            .waitForElementVisible('h1.h2') //Suchergebnisse title
            .getAttribute('input[name=searchTerm]','$$currentValue', function(result) {
                client.assert.equal(articleName,result['value'])});

});

Then('the the product with name {string} should appear', function (productTitle) {
  
    return client
            .waitForElementVisible('a[href="'+productEP+'"]',15000)
            //This doesn't work 
            //.assert.containsText('a[href="/produkte/da-komm-ich-her-gurke/00-408966"]',productTitle) 
            .getAttribute('a[href="'+productEP+'"]','textContent', function(result) {
                client.assert.equal(productTitle,result['value'])});
                //console.log('result',result['value'])});
});

When('I go to the detail view of the product with name {string}', function (productTitle) {
  
  //" Error while running .clickElement() protocol action: stale element reference: element is not attached to the page document" 
  return client.click('css selector','a[href="'+productEP+'"]').waitForElementVisible('.product-detail__desc-title');
});

Then('I land to the detail view of the {string} product', function (productTitle) {
  return client
            //.assert.containsText('product-detail__desc-title',productTitle);
            .getAttribute('.product-detail__desc-title','textContent', function(result) {
                client.assert.equal(productTitle,result['value'])});
});



When('I add {string} items to cart', function (amount) {
  
  // return client.elements('css selector','input[aria-label=Menge]', function(result) {
  //   for(let i=0;i<result.value.length;++i){
  //       console.log(result.value[i].getAttribute('baseURI'));
  //       if(result.value[i]['baseURI'].equal(url+productEP))
  //   }
  // });
  return client
            .waitForElementVisible('input[aria-label="Menge"]')
            //.clearValue('input[aria-label="Menge"]')
            .click('button.quantity__plus')
            .click('button.quantity__plus')
            .click('button.quantity__plus')
            .click('button.quantity__plus')
            .click('button.quantity__plus')
            //.setValue('input[aria-label="Menge"]',amount)
            .getAttribute('input[aria-label="Menge"]','value', function(result) {
              console.log(result['value']);
              client.assert.equal(amount,result['value'])})
            .click('button[title="in den Warenkorb"]');
});

Then('the cart shows {string} Items', function (amount) {
  return client
            .moveToElement('.badge.badge--important',5,5)
            .waitForElementVisible('[ng-bind="notifyNewBasketItem.count"]',15000)
            //.assert.visible('.product-list__product__amount');
            .assert.containsText('[ng-bind="notifyNewBasketItem.count"]',amount)
});
When('I go to the Warenkorb', function () {
  return client.click('.header__cart-icon-wrapper.relative').waitForElementVisible('h1.h2');
});     

Then('{string} is in it {string} times', function (productTitle, amount) {
  
  return client
           // .assert.containsText('.product-list__product__name',productTitle)
            .getAttribute('.product-list__product__name','textContent', function(result) {
            client.assert.equal(productTitle,result['value'])})
            .getAttribute('input.quantity__input[type="text"]','value', function(result) {
            client.assert.equal(amount,result['value'])});
});


When('I go to Filialenfinder -go with button- upper right', function () {
  
  return client
          .click('a[title="Filialfinder"]')
          .waitForElementVisible('div.flex__column.store-finder__column--top')
          .assert.visible('div.flex__column.store-finder__column--top');
});

Then('I enter to a search bar {string}', function (districtNumber) {
  
  return client
          .setValue('#searchStore',districtNumber)
          .pause(2000)
          .keys(client.Keys.ENTER);
});

Then('the pin with the hover- text {string} shows up', function (streetName) {
  
  return client
          .moveToElement('div[title="Mariahilferstrasse 186-188"]',2,2)
          //??
          .assert.attributeContains('div[title="Mariahilferstrasse 186-188"]','title', streetName);
         

});