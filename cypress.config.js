const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
 
module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
   // screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure:true,
    //trashAssetsBeforeRuns:true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      on('task', {
        log(message) {
          const logFilePath = path.join("./cypress/logs/cypress.log");
          fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
          return null;
        }
      });
      on('task', {
        // log(message) {
        //   const logFilePath = path.join("./cypress/logs/cypress.log");
        //   fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
        //   return null;
        // },
       
        logScreenshot(info) {
          const screenshotlogFilePath = path.join("./cypress/logs/screenshots.log");
          fs.appendFileSync(screenshotlogFilePath, `${new Date().toISOString()} - ${info}\n`);
          return null;
        },
       
        saveScreenshotInfo({  screenshotName, suiteName, testName, testSteps, fileName}) {
          const screenshotInfo = {
            suite: suiteName,
            testcase: testName,
            Teststeps: testSteps,
            TestCasesreenshot: screenshotName,
            file: fileName,
            path: `./cypress/screenshots/${fileName}`,
            timestamp: new Date().toISOString()
          }
          const jsonFilePath = path.join("./cypress/screenshots/screenshotInfo.json");
          let data = [];
          data.push(screenshotInfo);
          fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
          return null;
        },
      });
    },
  },
});
 
