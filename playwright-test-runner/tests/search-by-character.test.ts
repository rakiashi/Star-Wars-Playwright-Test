import { test } from "../../common/fixtures/base.page";
import data from "../../common/test-data/data.json";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search Start Wars Character feature tests @FullRegression", async () => {
  test("Search-Character : Search for a start wars character by name and should verify the properties", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "Luke Skywalker", "ENTER_KEY");
    await searchPage.verifyPeopleSearchResult(data.people.LukeSkywalker);
  });

  test("Search-Character : Search for an invalid search text and verify not found message", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "no name", "");
    await searchPage.verifyNotFoundMessage();
  });

  test("Search-Character : Search for a start wars female character by name and should verify the properties", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "Leia Organa", "");
    await searchPage.verifyPeopleSearchResult(data.people.LeiaOrgana);
  });
});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
