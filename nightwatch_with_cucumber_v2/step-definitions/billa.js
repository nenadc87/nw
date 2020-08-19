const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const url = 'https://www.billa.at';
const productEP ='' ;//'/produkte/da-komm-ich-her-gurke/00-408966';
var productBaseURI;
var toClick;
Given('I open Billa Online Shop page', function () {

  return client.url(url)
    //.maximizeWindow()
    .waitForElementVisible('body', 1000);
});

Given('I\'m loged in on the Billa Page with usename {string} and password {string}', function (username, password) {

  return client
    .click('.header__user-buttons-item button[aria-label=Anmelden]')
    .waitForElementVisible('div[data-dd-class-if-flapout=account]', 1000)
    .setValue('input[name=Email]', username)
    .setValue('input[name=LoginPassword]', password)
    .click('button.button--arrow[type=submit]')
    //.click(button)
    .waitForElementVisible('.header__account-text')
    .assert.containsText('.header__account-text', 'Mein Konto')
});

When('I search for {string}', function (articleName) {



  return client
    .click('input[name=searchTerm]')
    .setValue('input[name=searchTerm]', articleName)
    .click('.header__search__button')
    .waitForElementVisible('h1.h2') //Suchergebnisse title
    .waitForElementVisible('input[name=searchTerm]') 
    .getElementProperty('input[name=searchTerm]', 'value', function (result) {
      client.assert.equal(result['value'], articleName)
    });

});

Then('the the product with name {string} should appear', async function (productTitle) {
  client.waitForElementVisible('li.tile')
  try {
    var elementToAssert;
    var isFound = false;
    await client.elements('css selector','li.tile',function (result) {
      result.value.forEach(function (prop) {
        const firstKey = 0;
        const keyOfElement = Object.keys(prop)[firstKey];
           client.elementIdText(prop[keyOfElement], function (innerTextValue) {
            if (String(innerTextValue.value).toLowerCase().includes(productTitle.toLowerCase())) {
              isFound = true;
              toClick = prop[keyOfElement];
            }
           });
        //}
      });
    });
    //return client.assert.attributeContains(elementToAssert,'innerText', productTitle);
    return client.assert.equal(isFound, true);
  } catch (error) {
  }
});

When('I go to the detail view of the product with name {string}', async function (productTitle) {
  return client
        //.moveTo(toClick,0,0, function () {
    .elementIdClick(toClick, function (clicked) { 
        console.log("You clicked on element a element which satisfy your condition.");                         
    });
 });

Then('I land to the detail view of the {string} product',  function (productTitle) {
  return client
    //.assert.containsText('product-detail__desc-title',productTitle);
    .getElementProperty('.product-detail__desc-title', 'textContent', function (result) {
      client.getElementProperty('.product-detail__desc-title', 'baseURI', function (result){
        productBaseURI = result.value;
      });
      
      client.assert.equal(productTitle, result['value'])
    });
});



When('I add {string} items to cart',  function (amount) {
  
  // client
  // .waitForElementVisible('.quantity__input')
  // .moveToElement('h3.column',undefined, undefined)
  // .pause(1000)
  // .moveToElement('.tile-view-swiper__nav', 10,10)
  // .elements('css selector','.quantity__input',function(elements){
   

  //   const firstKey = 0;
  //   const keyOfFirstElement = Object.keys(elements.value[0])[firstKey];
  //   client.elementIdClick(elements.value[0][keyOfFirstElement]);
  //   console.log(elements.value[0][keyOfFirstElement]);

  // });
  // return client
  //   .waitForElementVisible('.quantity__inputinput[aria-label="Menge"]')
  //   .click('.quantity__inputinput[aria-label="Menge"]')
  //   .assert.visible('.quantity__inputinput[aria-label="Menge"]')
  //   .setValue('.quantity__inputinput[aria-label="Menge"]', "\uE003" + amount)
  //   .getAttribute('.quantity__inputinput[aria-label="Menge"]', 'value', function (result) {
  //     console.log(result['value']);
  //     client.assert.equal(amount, result['value'])
  //   })
  //   .click('button[title="in den Warenkorb"]');
//    return client.execute(function() {
//     let elements = document.querySelectorAll('').value;
//     console.log(elements.lengths);

// }, function(result) {
    // for (let i = 0; i < result.value; i++) {
    //     if (labels[i].htmlFor == 'Next') {
    //        let elem = getElementById(labels[i].htmlFor)
// };
// });
  // client.waitForElementVisible('');
  // await client.elements('css selector', '', function(result) {

  //   result.value.forEach(function (element) {

  //     const firstKey = 0;
  //     const keyOfElement = Object.keys(element)[firstKey];
      // console.log(element[keyOfElement]);
      
        // client.elementIdText(prop[keyOfElement], function (innerTextValue) {
          // client.elementIdAttribute(element[keyOfElement],'baseURI', function (innerTextValue) {

          // if (String(innerTextValue.value).toLowerCase().includes(productTitle.toLowerCase())) {
          //   isFound = true;
          //   toClick = prop[keyOfElement];
          // }
    //       console.log(innerTextValue.value);
    //      });
    // });
  // });

  return client
    .waitForElementVisible('input[aria-label="Menge"]')
    // .moveToElement('input[aria-label="Menge"]',undefined,undefined)
    // .pause(1000)
    // .moveToElement('input[aria-label="Menge"]',undefined,undefined)
    .assert.visible('input[aria-label="Menge"]')
    .setValue('input[aria-label="Menge"]', "\uE003" + amount)
    .getElementProperty('input[aria-label="Menge"]', 'value', function (result) {
      console.log(result['value']);
      client.assert.equal(amount, result['value'])
    })
    .execute('var detailViewTitle = document.getElementsByClassName("product-detail__desc-title");' +
    'detailViewTitle[0].scrollIntoView(true);')
    .click('button[title="in den Warenkorb"]');
});


Then('the cart shows {string} Items', function (amount) {
  return client
    .waitForElementVisible('#header-cart-region')
    .execute('window.scrollTo(0,0);var cart = document.getElementById("header-cart-region");' + //moveToElement on Firefox
        ' cart.dispatchEvent(new Event("mouseenter", {bubbles: true}));')
    .waitForElementVisible('span.product-list__product__amount', 15000)
    .assert.containsText('span.product-list__product__amount', amount);

  //.assert.containsText('[ng-bind="notifyNewBasketItem.count"]',amount)
});
When('I go to the Warenkorb', function () {
  return client.click('.header__cart-icon-wrapper.relative').waitForElementVisible('h1.h2');
});

Then('{string} is in it {string} times', function (productTitle, amount) {

  return client
    // .assert.containsText('.product-list__product__name',productTitle)
    .getElementProperty('.product-list__product__name', 'textContent', function (result) {
      client.assert.equal(productTitle, result['value'])
    })
    .getElementProperty('input[name="amount"]', 'value', function (result) {
      client.assert.equal(amount, result['value'])
    });
});


When('I go to Filialenfinder -go with button- upper right', function () {

  return client
    .click('a[title="Filialfinder"]')
    .waitForElementVisible('div.flex__column.store-finder__column--top')
    .assert.visible('div.flex__column.store-finder__column--top');
});

Then('I enter to a search bar {string}',async function (districtNumber) {

  return client
    .click('#searchStore')
    .setValue('#searchStore', districtNumber+"\uE007")
    // .keys(client.Keys.ENTER)
    .pause(2000)
    .setValue('#searchStore', "\uE007")
    // .keys(client.Keys.ENTER)
    .pause(2000)
    .execute('var listMT10Element = document.getElementsByClassName("mt-10");' +
    'for(let i = 0;i<listMT10Element.length;++i){'+
    'if(listMT10Element[i]&&listMT10Element[i].textContent.toLowerCase().includes("Hier finden Sie'+
    ' die Öffnungszeiten und weitere Daten zu Ihrer gewünschten Filiale.".toLowerCase()))'+
    ' listMT10Element[i].scrollIntoView(true);}')
   
    .pause(5000)
});

Then('the pin with the hover- text {string} shows up', function (streetName) {

  return client
    //.moveToElement('div[title="Mariahilferstrasse 186-188"]', 2, 2)
    //??
    .execute('var divs = document.getElementsByTagName("div");' +
    'for(let i = 0;i<divs.length;++i){'+
    'if(divs[i] && divs[i].title.includes("Mariahilferstrasse 186-188'+
    ' "))'+
    ' divs[i].dispatchEvent(new Event("mouseenter", {bubbles: true}));}')
    .assert.attributeContains('div[title="Mariahilferstrasse 186-188"]', 'title', streetName);


});