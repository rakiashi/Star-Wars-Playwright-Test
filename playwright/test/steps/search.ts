import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import data from "../test-data/data.json";
import { pageFixture } from "../../helpers/pageFixture";
import searchPage from "../page/searchPage";
// import { expect } from "@playwright/test";
import locatorHandler from "../../helpers/common/locator-handler";

setDefaultTimeout(60 * 1000);

Given("I launch star wars application", async function () {
  const enviornment = process.env.ENV;
  let baseUrl = null;
  if (enviornment.includes("local")) {
    baseUrl = "http://localhost:4200";
  } else {
    baseUrl = "L6 url";
  }
  await pageFixture.page.goto(baseUrl);
  await pageFixture.page.waitForLoadState();
  await locatorHandler.assertExpectVsActual(
    searchPage.pageHeader,
    data.testData.pageTitle
  );
});

When(
  "Verify default page content and people option is checked as a preference",
  async function () {
    await pageFixture.page.locator(searchPage.peopleRadio).isChecked();
    await locatorHandler.isElementDisplayed(searchPage.planetRadio);
    await locatorHandler.isElementDisplayed(searchPage.searchField);
    await locatorHandler.isElementDisplayed(searchPage.searchButton);
  }
);

Then("Verify Not Found message", async function () {
  await locatorHandler.isElementDisplayed(searchPage.notFound);
  await locatorHandler.assertExpectVsActual(searchPage.notFound,data.testData.notFoundText);
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
    await pageFixture.page.locator(searchPage.searchField).clear();
    await locatorHandler.waitAndClick(searchPage.searchButton);
    await locatorHandler.isElementDisplayed(searchPage.notFound);
  }
);

Then(
  /I see search result card shown (\d+)?/,
  async function (numbeOfCards?: number) {
    await pageFixture.page
      .locator(searchPage.cardBodyByIndex(numbeOfCards))
      .waitFor({ timeout: 6000 });
      await locatorHandler.isElementDisplayed(searchPage.cardTitleByIndex(numbeOfCards));
  }
);
