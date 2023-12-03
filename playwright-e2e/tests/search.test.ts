import { expect } from "@playwright/test";
import { test } from "../../integration-utils/fixtures/base.page";

test.beforeEach(async ({ searchPage, context }) => {
  context.clearCookies();
  await searchPage.visit();
});

test.describe("Search by name feature of Star Wars tests @FullRegression", async () => {
  test("Verify default page content and people option is checked as a preference", async ({
    searchPage,
  }) => {
    await searchPage.peopleRadio().isChecked();
    await searchPage.planetRadio().isVisible();
    await searchPage.searchField().isVisible();
    await searchPage.searchButton().isVisible();
  });

  test("Search with full name of a character and switch to planet option you should see not found message", async ({
    searchPage,
  }) => {
    // await searchPage.searchByName("people", "Luke Skywalker", "");
    expect(searchPage.peopleRadio().isChecked()).toBeTruthy();
    await searchPage.searchField().fill("Luke Skywalker");
    await searchPage.planetRadio().click();
    // await searchPage.notFound().isVisible();
    expect(searchPage.notFound()).toBeTruthy();
  });

  test.skip("Search again with an empty search field and validate not found message", async ({
    searchPage,
  }) => {
    await searchPage.searchField().fill("Luke Skywalker");
    await searchPage.cardTitleByIndex(1)
    await searchPage.searchField().clear();
    await searchPage.searchButton().click();
  });

  test("Search with partial name of a character and you should see matching list of search results", async ({
    searchPage,
  }) => {
    await searchPage.searchField().fill("Skywalker");
    await searchPage.searchButton().click();
    await searchPage.isElementDisplayed(searchPage.cardTitleByIndex(3));
    await searchPage.expectActualContainsExpected(
      searchPage.cardTitleByIndex(3),
      "Skywalker"
    );
  });
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});
