const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const url = 'https://datatables.net/';
var nenadExists = false;

Given('I open {string} page', function (string) {
  return client.url(url)
    .waitForElementVisible('body', 5000)
    .getElementProperty('h1', 'textContent', function (result) {
      client.assert.equal(result['value'], 'Add advanced interaction controlsto your HTML tables the free & easy way')
    });
});
Given('on the first page of the table, {string} age is {string}', async function (nameToTest, ageToTest) {
  try {
    var isAgeCorrect = false;
    await client.elements('css selector', 'tbody tr', function (result) {

      for (let i = 0; i < result.value.length; ++i) {
        const firstKey = 0;
        const keyOfElement = Object.keys(result.value[i])[firstKey];
        if (i == 0) continue;

        client.elementIdProperty(result.value[i][keyOfElement], 'innerText', function (rowStrings) {

          let str = rowStrings.value;
          let reqStr = str.split(/\s+/);
          if (reqStr[0] + " " + reqStr[1] === nameToTest) {
            for (let i = 0; i < reqStr.length; ++i) {
              if (reqStr[i] === ageToTest)
                isAgeCorrect = true;
            }
          }
        });
      }
    });
    return client.assert.equal(isAgeCorrect, true);
  } catch (error) {
  }
});
Given('on the first page of the table, sum ages of {string} is {string}', async function (positionToTest, totalAgeToTest) {
  try {
    var isTotalAgeCorrect = false;
    var totalAge = 0;
    await client.elements('css selector', 'tbody tr', function (result) {

      for (let i = 0; i < result.value.length; ++i) {
        const firstKey = 0;
        const keyOfElement = Object.keys(result.value[i])[firstKey];
        if (i == 0) continue;

        client.elementIdProperty(result.value[i][keyOfElement], 'innerText', function (rowStrings) {

          let str = rowStrings.value;
          // console.log(str)
          let reqStr = str.split(/\s+/);
          //  for(let i=0;i<reqStr.length;++i){
          //      console.log(reqStr[i]);
          //  }
          // for(let i=0;i<reqStr.length;++i){
          if (reqStr[2] + " " + reqStr[3] === positionToTest)
            totalAge += parseInt(reqStr[reqStr.length - 2]);
          // console.log(reqStr[reqStr.length-2]);
          // }

        });
      }
    });
    if (totalAge == parseInt(totalAgeToTest))
      isTotalAgeCorrect = true;
    return client.assert.equal(isTotalAgeCorrect, true);
  } catch (error) {
  }
});


Given('on the first page of the table, the person who started on {string} has salary {string}', async function (dateToCheck, salaryToCheck) {
  try {
    var salaryAndDateCorrect = false;
    var totalAge = 0;
    await client.elements('css selector', 'tbody tr', function (result) {

      for (let i = 0; i < result.value.length; ++i) {
        const firstKey = 0;
        const keyOfElement = Object.keys(result.value[i])[firstKey];
        if (i == 0) continue;

        client.elementIdProperty(result.value[i][keyOfElement], 'textContent', function (rowStrings) {

          let str = rowStrings.value;
          var num = /\d/;
          var firstNumber = str.match(num);
          var dateStartIndex = firstNumber.index + 2;
          var date = str.substring(dateStartIndex, dateStartIndex + 10);
          var salary = str.substring(dateStartIndex + 11, str.length - 1);

          if (date === dateToCheck && salary === salaryToCheck)
            salaryAndDateCorrect = true;
        });
      }
    });
    if (totalAge == parseInt(totalAgeToTest))
      isTotalAgeCorrect = true;
    return client.assert.equal(salaryAndDateCorrect, true);
  } catch (error) {
  }
});
Given('there is no data for column Name {string}', async function (nameToCheck) {
  try {
    var nextClickable = true;
    
      await client
      .execute('var table = document.getElementById("example_wrapper");' +
        'table.scrollIntoView(true);');
        // .perform(async function(){  
          while (nextClickable) {
            console.log("in loop")
            checkNenad(nameToCheck);
              await client.element("css selector", ".paginate_button.next.disabled",
                function (result) {
                      console.log("result value of element" + result.status)
                      if (result.status !== -1) {
                        nextClickable=false;
                      }
                      else{
                          client.click(".paginate_button.next")
                      }
                  })
                  .waitForElementVisible('body', 1000);
                  console.log(nenadExists);
              }     
        console.log("asdasdasdasd");
      
        console.log(nenadExists);  
        // })
        return await client.assert.equal(nenadExists, false);
      // return 'pending';
    } catch (error) {
    }
  });

Given('calculate and average age for all persons in table', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

async function checkNenad(nameToCheck) {
  await client.elements('css selector', 'tbody tr', function (result) {
    console.log("CHECK NENAD");
    for (let i = 0; i < result.value.length; ++i) {
      const firstKey = 0;
      const keyOfElement = Object.keys(result.value[i])[firstKey];
      if (i == 0) continue;

      client.elementIdProperty(result.value[i][keyOfElement], 'innerText', function (rowStrings) {

        let str = rowStrings.value;
        let reqStr = str.split(/\s+/);
        
        if (reqStr[0] === nameToCheck) {
          nenadExists = true;
        }
      });
    }
  });
}

