### QA Assesment Solution 

The objective of building this framework is for assesing for a QA role in Fedex

This Testing framework is integrated within the FE existing source code of Star Wars app using playwright with typescripts along with cucumber plugin to achive BDD appraoch of writing tests scenarios.

## playwright
      |-helpers
      |-test
          |- test-data
          |- features
          |- page
          |- steps

 ### **Pre-requisites**
	node version - >v18.16.x
	npm init playwright -D
	npm i @cucumber/cucumber -D
 
## Browser tested 
	* Chrome 
	* Firefox

### Initiating the tests runs
  * npm run e2e-fullreg-chrome  # this cmd first spins up the local host app & runs test tests of @Fullregression on chrome browser

  * npm run e2e-smoke-firefox   #this cmd first spins up the local host app & runs test tests of @Smoke on firefox browser

  * npm run e2e-rerun-chrome   #this first spins up the local host app & runs failed tests on chrome browser

### Tests Scenarios Covered

* Search-Character : Search for a start wars character by name and should verify the properties
* Search for an invalid search text and verify not found message
* Search-Planet : Search for a start wars planet by name and verify the properties
* Search for an invalid data using ENTER Key and verify not found message
* Search with full name of a character and switch to planet option you should see not found message
* Search again with an empty search field and validate not found message
* Search with partial name of a character and you should see matching list of search results

### Known Issues?

* Search again with an empty search field and validate not found message

the above scenario is failing due to an issue where after clearing the search field and clicking on to search button : : the search result is not removed and there is no not found message.

### Tests Report and others

test-results 

    |-rerun
    |-screenshot
    |-cucumber-report.html

* Latest tests report can be viewed on accessing cucumber-report.html file on a browser which give detailed information about the latest run 

* For failed scenarios there is an screenshot attached to  it, which helps to debug

* rerun folder captures the failed features/sceanrios which inturns helps to run only failed test using a cmd as explied earlier.