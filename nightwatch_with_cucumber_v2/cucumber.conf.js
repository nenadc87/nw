const fs = require('fs');
const fse = require('fs-extra')
const dateFormat = require('dateformat');

const { setDefaultTimeout, After, AfterAll, BeforeAll } = require('cucumber');
const {
  client,
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  getNewScreenshots
} = require('nightwatch-api');

const report = require('multiple-cucumber-html-reporter');

const process = require('process');
const os = require('os');

const generatedPath = './generated/';

setDefaultTimeout(60000);

var execution_start = ""

BeforeAll(async () => {
  execution_start = dateFormat(new Date(), "yyyy.mm.dd HH:MM:ss.l");

  await startWebDriver({ env: process.env.BROWSER });
  await createSession({ env: process.env.BROWSER });

  client.windowSize('current', 1280, 800, function(result) {
    console.log(result.value);
  });
});


AfterAll(async () => {

  await closeSession();
  await stopWebDriver();
  setTimeout(async () => {

    await AddMetadataToResult();
    await PrepareForReportGeneration();

    report.generate({
      jsonDir: './report/',
      reportPath: generatedPath,
      pageFooter: "<p style='text-align:center'>generated on " + (new Date()).toLocaleString() + "</p>",
      customMetadata: true,
      customData: {
        title: 'Run info',
        data: [
          { label: 'Test1', value: 'Value1' }
        ]
      }
    });
  }, 1000);
});

After(function () {
  getNewScreenshots().forEach(file => this.attach(fs.readFileSync(file), 'image/png'));
});


async function PrepareForReportGeneration() {
  try {

    await fse.remove(generatedPath)
    await fs.mkdirSync(generatedPath)


  } catch (exception) {
    console.log("Error while preparing for report generation:")
    console.log(exception)
  }
}


async function AddMetadataToResult() {
  try {
    var resultFileName = 'report/cucumber_report_' + process.env.BROWSER;
    var resultFileNameWithExtension = resultFileName + '.json';

    let rawdata = fs.readFileSync(resultFileNameWithExtension);
    let cucumberJSON = JSON.parse(rawdata);

    const metadata = [
      { name: 'Execution start time', value: execution_start },
      { name: 'Execution end time', value: dateFormat(new Date(), "yyyy.mm.dd HH:MM:ss.l") },
      { name: 'Browser', value: process.env.BROWSER },
      { name: 'Device', value: os.hostname() + " - " + os.platform() + " (" + os.release() + ")" },
    ]

    cucumberJSON[0].metadata = metadata;

    fs.writeFileSync(resultFileNameWithExtension, JSON.stringify(cucumberJSON), err => {
      if (err) {
        console.log('Error while writing file', err)
      } else {
        console.log('Successfully wrote file')
      }
    })

    fs.rename(resultFileNameWithExtension, resultFileName + dateFormat(new Date(), "__yyyy_mm_dd__HH_MM_ss_l") + ".json", function (err) {
      if (err) console.log('ERROR while renaming the file: ' + err);
    });


  } catch (exception) {
    console.log("Error while adding metadata to file:")
    console.log(exception)
  }
}
