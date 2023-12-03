import { Given, When, Then,setDefaultTimeout } from "@cucumber/cucumber";
import data from "../../../common/test-data/data.json";
import { pageFixture } from "../../helpers/pageFixture";
import searchPage from "../page/searchPage";
import locatorHandler from "../../helpers/common/locator-handler";
import searchLocators from "../../../common/locators/searchLocators";
import { ConfigReader } from "../../../common/configReader/config.reader";

setDefaultTimeout(60 * 1000);

Given("I launch star wars application", async function () {
  
  await pageFixture.page.goto(ConfigReader.getEnvVars().BASE_URL);
  await pageFixture.page.waitForLoadState();
  await locatorHandler.assertExpectVsActual(
    searchLocators.pageHeader,
    data.testData.pageTitle
  );
});

When(
  "Verify default page content and people option is checked as a preference",
  async function () {
    await pageFixture.page.locator(searchLocators.peopleRadio).isChecked();
    await locatorHandler.isElementDisplayed(searchLocators.planetRadio);
    await locatorHandler.isElementDisplayed(searchLocators.searchField);
    await locatorHandler.isElementDisplayed(searchLocators.searchButton);
  }
);

Then("Verify Not Found message", async function () {
  await locatorHandler.isElementDisplayed(searchLocators.notFound);
  await locatorHandler.assertExpectVsActual(searchLocators.notFound,data.testData.notFoundText);
});

When(
  /I search for (people|planet) as "(.*)"(by ENTER_KEY)?/,
  async function (optionType: string, searchValue: string, byEnterKey: string) {
    await searchPage.searchAText(optionType, searchValue, byEnterKey);
  }
);

When(
  "I clear the search field and click on search button again",
  async function () {
    await pageFixture.page.locator(searchLocators.searchField).clear();
    await locatorHandler.waitAndClick(searchLocators.searchButton);
    await locatorHandler.isElementDisplayed(searchLocators.notFound);
  }
);

Then(
  /I see search result card shown (\d+)?/,
  async function (numbeOfCards?: number) {
    await pageFixture.page
      .locator(searchLocators.cardBodyByIndex(numbeOfCards))
      .waitFor({ timeout: 6000 });
      await locatorHandler.isElementDisplayed(searchLocators.cardTitleByIndex(numbeOfCards));
  }
);
