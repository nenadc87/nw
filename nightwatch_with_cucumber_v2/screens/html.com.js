const { client } = require('nightwatch-api');

exports.getInputIdForFavouriteAnimalInput =  async () => {
    var inputID = null;
  
    await client.elements('tag name', 'label', function (labels) {
      labels.value.forEach(function (label) {
        client.elementIdAttribute(label.ELEMENT, 'innerText', function (innerTextValue) {
          if (innerTextValue.value.toLowerCase().includes("favorite animal")) {
            client.elementIdAttribute(label.ELEMENT, 'for', function (forValue) {
              inputID = forValue.value;
            });
          }
        });
      });
    });
  
    return inputID;
  }