const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');   
         
Given('I open Billa Online Shop page', function () {
  
  return client.url('https://www.billa.at/')
                .maximizeWindow()
                .waitForElementVisible('body',1000);
});

Given('I\'m loged in on the Billa Page with usename {string} and password {string}', function (username, password) {
  

  let button = (client)=>{
    let buttons =  client.elements('css selector', 'button.button--arrow[type=submit]');
    for(let i=0;i<buttons.size;++i){
        if(buttons[i].textContent=="Anmelden")
          return buttons[i]; 
    }
  }
 // console.log(button);

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



When('I search for {string}', function (string) {
  
  return 'pending';
});




Then('the the product with name {string} should appear', function (string) {
  
  return 'pending';
});




When('I go to the detail view of the product with name {string}', function (string) {
  
  return 'pending';
});



Then('I land to the detail view of the {string} product', function (string) {
  
  return 'pending';
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