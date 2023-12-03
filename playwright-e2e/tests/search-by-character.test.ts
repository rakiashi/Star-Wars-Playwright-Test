import { test } from "../../integration-utils/fixtures/base.page";
import data from "../../integration-utils/test-data/data.json";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search Start Wars Character feature tests @FullRegression", async () => {
  test("Search-Character : Search for a start wars character by name and should verify the properties", async ({
    searchPage,
  }) => {
    await searchPage.peopleRadio().isChecked();
    await searchPage.searchField().fill(data.people.LukeSkywalker.title);
    await searchPage.searchButton().press('Enter');
    await searchPage.isElementDisplayed(searchPage.cardTitleByIndex(1));
    await searchPage.expectActualContainsExpected(
      searchPage.cardTitleByIndex(1),data.people.LukeSkywalker.title);
        await searchPage.expectActualContainsExpected(
          searchPage.cardRowValueByIndex(1,1),data.people.LukeSkywalker.gender);
          await searchPage.expectActualContainsExpected(
            searchPage.cardRowValueByIndex(2,1),data.people.LukeSkywalker.birthyYear);
            await searchPage.expectActualContainsExpected(
              searchPage.cardRowValueByIndex(3,1),data.people.LukeSkywalker.eyeColor);    
              await searchPage.expectActualContainsExpected(
                searchPage.cardRowValueByIndex(4,1),data.people.LukeSkywalker.skinColor);    
  });

  test("Search-Character : Search for an invalid search text and verify not found message", async ({
    searchPage,
  }) => {
    await searchPage.peopleRadio().isChecked();
    await searchPage.searchField().fill('no name');
    await searchPage.searchButton().click();
    await searchPage.notFound().isVisible();
  });
});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
