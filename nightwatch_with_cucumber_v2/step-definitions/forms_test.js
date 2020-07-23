const { client } = require('nightwatch-api');
const { browser } = require('nightwatch');
const { Given, Then, When } = require('cucumber');

var atButtonSelector = ".header__contact";
var mktoFormSelector = ".FormPanel form[class*='mktoForm'][id*=mktoForm_]";
var infoLabelSelector = ".InfoLabel"


Given(/^\(DT\) system under test is opened in a browser on (.*)$/, function (url) {
  return client.url(url).waitForElementVisible('body', 1000);
});

Given('[DT] i clicked on the AT button in toolbar', function () {
  return client.waitForElementVisible(atButtonSelector, 2000).click(atButtonSelector);
});

Then('[DT] Mkto Contact form is opened', function () {
  return client.waitForElementVisible(mktoFormSelector, 15000).assert.visible(mktoFormSelector);
});

Then(/^\[DT\] I select (.*) as country$/, async (country) => {

  var countrySelect;

  await client.elements('css selector', 'select', function (selects) {
    selects.value.forEach(function (select) {
      client.elementIdElements(select.ELEMENT, 'css selector', 'option', function (options) {
        options.value.forEach(function (option) {
          client.elementIdAttribute(option.ELEMENT, 'innerText', function (res) {
            if (res.value === "(select country)") {
              countrySelect = select;
            }
          });
        });
      });

    });
  });

  return client.elementIdElement(countrySelect.ELEMENT, "xpath", ".", function (element) {
    client.elementIdElement(element.value.ELEMENT, 'css selector', 'option[value="' + country + '"]', function (option) {
      client.elementIdClick(option.value.ELEMENT);
    });
  });
});

Then(/^\[DT\] I enter (.*) as email$/, async (email) => {

  var inputID;

  await client.elements('tag name', 'label', function (labels) {
    labels.value.forEach(function (label) {
      client.elementIdAttribute(label.ELEMENT, 'innerText', function (innerTextValue) {
        if (innerTextValue.value.toLowerCase().includes("e-mail")) {
          client.elementIdAttribute(label.ELEMENT, 'for', function (forValue) {
            inputID = forValue.value;
          });
        }
      });
    });
  });

  return client.setValue("#" + inputID, email);
});


When('[DT] I click on submit', function () {
   return client.click('input[value="Send request"]').pause(1000);
});

Then('[DT] Info message Your request has been successfully sent is shown', function () {
  return client.waitForElementVisible(infoLabelSelector, 15000).assert.visible(infoLabelSelector);;
});