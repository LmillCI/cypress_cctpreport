import { getScreenshotDetails } from './utils';
let testSteps = [];
 
function addTestStep(step, screenshotName) {
  testSteps.push({ step, screenshotname: screenshotName });
}
describe('Sample suite', () => {
  beforeEach(() => {
    testSteps = [];  // Reset the test steps before each test
});
 
  afterEach(function() {
   
      const { suiteName, testName, fileName } = getScreenshotDetails(this.currentTest);
      const  screenshotName = `${suiteName}-${testName}`;
      cy.task('saveScreenshotInfo', {  screenshotName, suiteName, testName, testSteps , fileName });
  });
// it('TestCase1-  verify title-negative test', function() {
//     cy.visit("https://opensource-demo.orangehrmlive.com/");
//     cy.screenshot('orangehrm homepage')
//      addTestStep('visit', ' orangehrm homepage');
//     cy.title().should('eq', 'OrangeHRM123');
//    cy.screenshot('title verification error')
//     addTestStep('Assertion', 'title verification error');
 
//   });
  it('TestCase2 - Saucedemo Site', function() {
    cy.visit("https://www.saucedemo.com/v1/").screenshot('saucedemo');
    addTestStep('visit website', 'saucedemo')
   
  });
 
 
});
