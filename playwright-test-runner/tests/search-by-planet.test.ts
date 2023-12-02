import { test } from "../../common/fixtures/base.page";
import data from "../../common/test-data/data.json";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search Star Wars Planet feature tests @FullRegression", async () => {
  test("Search-Planet : Search for a start wars planet by name and verify the properties", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("planet", "Alderaan", "ENTER_KEY");
    await searchPage.verifyPlanetSearchResult(data.planet.Alderaan);
  });

  test("Search-Planet : Search for an invalid data using ENTER Key and verify not found message", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("planet", "Earth", "ENTER_KEY");
    await searchPage.verifyNotFoundMessage();
  });
});


test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
