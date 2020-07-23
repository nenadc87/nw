const runAll = require("npm-run-all");
const process = require('process');

runAll(["test-chrome"/*, "test-chromeheadless", "test-firefox"*/], {parallel: true, stdout : process.stdout, stderr : process.stderr, continueOnError : true, maxParallel : 5, printLabel : true })
    .then(() => {
        console.log("done!");
    })
    .catch(err => {
        console.log("failed!");
    });