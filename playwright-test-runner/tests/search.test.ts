import { test } from "../../common/fixtures/base.page";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search by name feature of Star Wars tests @FullRegression", async () => {
  test("Verify default page content and people option is checked as a preference", async ({
    searchPage,
  }) => {
    await searchPage.verifyDefaultSearchContent();
  });

  test("Search with full name of a character and switch to planet option you should see not found message", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "Luke Skywalker", "");
    await searchPage.cardTitleByIndex(1);
    await searchPage.searchByName("planet", "", "");
    await searchPage.verifyNotFoundMessage();
  });

  test.skip("Search again with an empty search field and validate not found message", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "Luke Skywalker", "");
    await searchPage.cardTitleByIndex(1).isVisible();
    await searchPage.clearSearchTextAndClick();
  });

  test("Search with partial name of a character and you should see matching list of search results", async ({
    searchPage,
  }) => {
    await searchPage.searchByName("people", "Skywalker", "");
    await searchPage.cardTitleByIndex(3).isVisible();
  });
});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  });
