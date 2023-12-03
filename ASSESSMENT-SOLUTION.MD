### QA Assesment Solution 

The objective of building this framework is to access a QA role at FedEx

Testing Framework is integrated within the FE existing source code of the Star Wars app using playwright with typescripts along with the cucumber plugin to achieve the BDD approach of writing test scenarios, also I have playwright-test-runner way of framework implemented within the same repo.

## playwright-test-runner

      |-search-by-character.test.ts
      |-search-by-planets.test.ts
      |-search.test.ts      

## playwright-cucumber

      |-helpers
      |-test
          |- features
          |- page
          |- steps

 ### **Pre-requisites**
	node version* - >v18.16.x
	npm init playwright -D
	npm i @cucumber/cucumber -D
 
## Browsers tested 
	* Chrome 
	* Firefox

**Note:** 
 * The BASE_URL is configured in *env.config.json* by default test runs on local [http://localhost:4200]
 * By default test runs with workers=1 which can be configure to run parallel in future
 * You can configure ***process.env[ENV,HEADLESS,BROWSER]*** options which can be modify within the npm cmds for desire test runs
 * Page locators is shared this can be modify under *common/locators/* 
 * Test-data is also shared *common/test-data/data.json/* 

### Initiating the test runs locally

  * *npm run start* # this cmd is to initialize the start wars app to serve locally on  # separate terminal
  * *npm run clean-reports* # this cmd cleanups both *test-results* and *playwright-report* folders directories

### Initiating the playwright-cucumber test runs locally

  * *npm run e2e-fullregression-local-chrome*  # this cmd clean-ups the report folders & test runs on local of cucumber tests by @Fullregression tag on chrome browser
  * *npm run e2e-fullregression-local-chrome-headless*  #this cmd clean-ups the report folders & test runs on local of cucumber tests by @Fullregression tag on chrome browser in headless mode
  * *npm run e2e-rerun-chrome*   #his cmd clean-ups the report folders & runs only failed tests on chrome browser

### Initiating the playwright-test-runner test runs locally

  * *e2e-fullregression-runner-test-headless*  # this cmd clean-ups the report folders & launch webser of local app & test runs on local of playwright-test-runner tests by @Fullregression tag on chrome browser in headless mode
  * *e2e-fullregression-runner-test-headless*  # this cmd clean-ups the report folders & launch webser of local app & test runs on local of playwright-test-runner tests by @Fullregression tag on chrome browser
  
### Test Scenarios Covered

* Search-Character : Search for a start wars character by name and should verify the properties
* Search for an invalid search text and verify not found message
* Search-Planet : Search for a start wars planet by name and verify the properties
* Search for an invalid data using ENTER Key and verify not found message
* Search with full name of a character and switch to planet option you should see not found message
* Search again with an empty search field and validate not found message
* Search with partial name of a character and you should see matching list of search results

### Known Issue in app 

* Search again with an empty search field and validate not found message

the above scenario is failing due to an issue where after clearing the search field and clicking on to search button : : the search result is not removed and there is no not found message.

### Test Report of playwright-cucumber

test-results 

    |-rerun
    |-screenshot
    |-cucumber-report.html

* Latest tests report can be viewed on accessing cucumber-report.html file on a browser which gives detailed information about the run

* For failed scenarios there is an screenshot attached to  it, which helps to debug

* rerun folder captures the failed features/sceanrios which inturns helps to run only failed test using a cmd as explied earlier.

### Test Report of playwright-test-runner
  playwright-report

    |-index.html

* Latest tests report can be viewed on accessing index.html file on a browser which gives detailed information about the run

* playwright-report is an default in-built report which has all the features such as screenshot & video on failure , traceview etc.

## Github Actions
- The github action workflow file is located in directory .github/workflows file name main.yml
- The workflow is triggered on every push to main branch or when a pull request is created 
- The workflow consist of single jobs: Build-and-Test # which initialize the app and runs playwright-test-runner tests by @FullRegression tag
- known issue test has been skipped to get a green build