import { test } from "../../integration-utils/fixtures/base.page";
import { getTestOptions } from "../../integration-utils/env/test-options";
import { swapiFixtures } from "../../integration-utils/test-data/swapi.fixtures";

const testOptions = getTestOptions();

test.describe("P0 Star Wars character search flows @P0 @FullRegression", () => {
  test.beforeEach(async ({ mockSwapiSearch, searchPage }) => {
    if (testOptions.apiMode === "mock") {
      await mockSwapiSearch("people", [swapiFixtures.people.lukeSkywalker]);
    }

    await searchPage.visit();
  });

  test("searches for a character and verifies the character card contract", async ({
    featureFlags,
    searchPage,
  }) => {
    test.skip(!featureFlags.peopleSearch, "People search feature flag is disabled.");

    await searchPage.searchPeople("Luke Skywalker");

    await searchPage.characters.expectCardToMatch(0, {
      name: "Luke Skywalker",
      gender: "male",
      birthYear: "19BBY",
      eyeColor: "blue",
      skinColor: "fair",
    });
  });
});

test.describe("P1 Star Wars character search flows @P1 @FullRegression", () => {
  test("shows matching people for a partial search", async ({
    featureFlags,
    mockSwapiSearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.peopleSearch, "People search feature flag is disabled.");

    if (testOptions.apiMode === "mock") {
      await mockSwapiSearch("people", [
        swapiFixtures.people.lukeSkywalker,
        swapiFixtures.people.leiaOrgana,
      ]);
    }

    await searchPage.visit();
    await searchPage.searchPeople("Skywalker");
    await searchPage.characters.expectNameContains(0, "Skywalker");
  });
});
