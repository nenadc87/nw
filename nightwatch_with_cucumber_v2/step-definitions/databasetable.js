const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const url = 'https://datatables.net/';

Given('I open {string} page', function (string) {
  return client.url(url)
  .waitForElementVisible('body', 5000)
  .getElementProperty('h1', 'textContent', function (result) {
    client.assert.equal(result['value'], 'Add advanced interaction controlsto your HTML tables the free & easy way')
  });
});
Given('on the first page of the table, {string} age is {string}', async function (string, string2) {
  try {
    var elementToAssert;
    var isFound = false;
    await client.elements('css selector','tbody tr', function (result) {
      console.log("Tests")
      result.value.forEach(function (prop) {
        const firstKey = 0;
        const keyOfElement = Object.keys(prop)[firstKey];
        // client.elementIdElements('prop[keyOfElement]', 'css selector', 'td', function(result) {
        //   console.log(result.value);
        //   // result.value.forEach(function (prop) {
        //   //   const firstKey1 = 0;
        //   //   const keyOfElement1 = Object.keys(prop)[firstKey];
        //   //   console.log(props);
        //   // });
        // });
           client.elementIdProperty(prop[keyOfElement], '',  function (innerTextValue) {
             console.log(innerTextValue.value);
          //    let name;
          //   // if (String(innerTextValue.value).toLowerCase().includes(productTitle.toLowerCase())) {
          //   //   isFound = true;
          //   //   toClick = prop[keyOfElement];
          //   // }
           });
        //}
      });
    });
    //return client.assert.attributeContains(elementToAssert,'innerText', productTitle);
    return client.assert.equal(isFound, true);
  } catch (error) {
  }
  return 'pending';
});
Given('on the first page of the table, sum ages of {string} is {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('on the first page of the table, the person who started on {string} has salary {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
Given('there is no data for column Name {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('calculate and average age for all persons in table', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});