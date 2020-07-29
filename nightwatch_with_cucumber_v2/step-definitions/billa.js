const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber'); 
const url = 'https://www.billa.at'; 
const productEP ='/produkte/da-komm-ich-her-gurke/00-408966';
         
Given('I open Billa Online Shop page', function () {
  
  return client.url(url)
               // .maximizeWindow()
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
            .waitForElementVisible('a[href="'+productEP+'"]')
            //This doesn't work 
            //.assert.containsText('a[href="/produkte/da-komm-ich-her-gurke/00-408966"]',productTitle) 
            .getAttribute('a[href="'+productEP+'"]','textContent', function(result) {
                client.assert.equal(productTitle,result['value'])});
                //console.log('result',result['value'])});
});

When('I go to the detail view of the product with name {string}', function (productTitle) {
  
  return client.click('a[href="'+productEP+'"]').waitForElementVisible('.product-detail__desc-title');
});

Then('I land to the detail view of the {string} product', function (productTitle) {
  return client
            //.assert.containsText('product-detail__desc-title',productTitle);
            .getAttribute('.product-detail__desc-title','textContent', function(result) {
                client.assert.equal(productTitle,result['value'])});
});



When('I add {string} items to cart', function (string) {
 
  return 'pending';
});




Then('the cart shows {int} Items', function (int) {
// Then('the cart shows {float} Items', function (float) {
  
  return 'pending';
});




When('I go to the Warenkorb', function () {
  
  return 'pending';
});


       

         Then('{string} is in it {string} times', function (string, string2) {
           
           return 'pending';
         });


       

         When('I go to Filialenfinder \(go with button- upper right)', function () {
           
           return 'pending';
         });

       

         Then('I enter to a search bar {string}', function (string) {
           
           return 'pending';
         });

  
       

         Then('the pin with the hover- text {string} shows up', function (string) {
           
           return 'pending';
        });