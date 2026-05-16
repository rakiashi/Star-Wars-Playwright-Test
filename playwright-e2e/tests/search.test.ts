import { expect } from "@playwright/test";
import { test } from "../../integration-utils/fixtures/base.page";
import { getTestOptions } from "../../integration-utils/env/test-options";
import { swapiFixtures } from "../../integration-utils/test-data/swapi.fixtures";

const testOptions = getTestOptions();

test.describe("P0 Search page smoke flows @P0 @FullRegression", () => {
  test.beforeEach(async ({ mockSwapiSearch, searchPage }) => {
    if (testOptions.apiMode === "mock") {
      await mockSwapiSearch("people", [swapiFixtures.people.lukeSkywalker]);
    }

    await searchPage.visit();
  });

  test("shows the default search experience with people selected", async ({
    searchPage,
  }) => {
    await searchPage.searchForm.expectDefaultState();
  });

  test("keeps the search query and type in the URL after searching", async ({
    page,
    searchPage,
  }) => {
    await searchPage.searchPeople("Luke Skywalker");

    await expect(page).toHaveURL(/searchType=people/);
    await expect(page).toHaveURL(/query=Luke(\+|%20)Skywalker/);
  });

  test("loads a shared people search URL directly", async ({
    searchPage,
  }) => {
    await searchPage.visit("/?searchType=people&query=Luke%20Skywalker");

    await searchPage.characters.expectCardToMatch(0, {
      name: "Luke Skywalker",
      gender: "male",
      birthYear: "19BBY",
      eyeColor: "blue",
      skinColor: "fair",
    });
  });
});

test.describe("P1 Search negative flows @P1 @FullRegression", () => {
  test("shows not found for an unknown people search", async ({
    featureFlags,
    mockSwapiEmptySearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.negativeSearch, "Negative search feature flag is disabled.");

    if (testOptions.apiMode === "mock") {
      await mockSwapiEmptySearch("people");
    }

    await searchPage.visit();
    await searchPage.searchPeople("No Name");
    await searchPage.notFoundMessage.expectVisible();
  });

  test("shows an API error when the people search service fails", async ({
    featureFlags,
    mockSwapiFailure,
    searchPage,
  }) => {
    test.skip(!featureFlags.negativeSearch, "Negative search feature flag is disabled.");
    test.skip(testOptions.apiMode !== "mock", "Failure scenarios require deterministic service mocks.");

    await mockSwapiFailure("people", 500);

    await searchPage.visit();
    await searchPage.searchPeople("Luke Skywalker");
    await searchPage.apiError.expectVisible();
  });

  test("treats malformed search responses as not found instead of crashing", async ({
    featureFlags,
    mockSwapiMalformedSearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.negativeSearch, "Negative search feature flag is disabled.");
    test.skip(testOptions.apiMode !== "mock", "Malformed response scenarios require deterministic service mocks.");

    await mockSwapiMalformedSearch("people");

    await searchPage.visit();
    await searchPage.searchPeople("Luke Skywalker");
    await searchPage.notFoundMessage.expectVisible();
  });
});
