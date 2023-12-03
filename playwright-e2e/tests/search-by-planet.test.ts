import { test } from "../../integration-utils/fixtures/base.page";
import data from "../../integration-utils/test-data/data.json";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search Star Wars Planet feature tests @FullRegression", async () => {
  test("Search-Planet : Search for a start wars planet by name and verify the properties", async ({
    searchPage,
  }) => {
    await searchPage.planetRadio().click();
    await searchPage.planetRadio().isChecked();
    await searchPage.searchField().fill(data.planet.Alderaan.title);
    await searchPage.searchButton().click();
    await searchPage.isElementDisplayed(searchPage.cardTitleByIndex(1));
    await searchPage.expectActualContainsExpected(
      searchPage.cardTitleByIndex(1),data.planet.Alderaan.title);
        await searchPage.expectActualContainsExpected(
          searchPage.cardRowValueByIndex(1,1),data.planet.Alderaan.population);
          await searchPage.expectActualContainsExpected(
            searchPage.cardRowValueByIndex(2,1),data.planet.Alderaan.climate);
            await searchPage.expectActualContainsExpected(
              searchPage.cardRowValueByIndex(3,1),data.planet.Alderaan.gravity);    
  });

  test("Search-Planet : Search for an invalid data using ENTER Key and verify not found message", async ({
    searchPage,
  }) => {
    await searchPage.planetRadio().click();
    await searchPage.searchField().fill('EARTH');
    await searchPage.searchButton().press('Enter');
    await searchPage.notFound().isVisible();
  });

});
  
test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
