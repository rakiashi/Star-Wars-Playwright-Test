import { test } from "../../integration-utils/fixtures/base.page";
import { getTestOptions } from "../../integration-utils/env/test-options";
import { swapiFixtures } from "../../integration-utils/test-data/swapi.fixtures";

const testOptions = getTestOptions();

test.describe("P0 Star Wars planet search flows @P0 @FullRegression", () => {
  test.beforeEach(async ({ mockSwapiSearch, searchPage }) => {
    if (testOptions.apiMode === "mock") {
      await mockSwapiSearch("planets", [swapiFixtures.planets.alderaan]);
    }

    await searchPage.visit();
  });

  test("searches for a planet and verifies the planet card contract", async ({
    featureFlags,
    searchPage,
  }) => {
    test.skip(!featureFlags.planetSearch, "Planet search feature flag is disabled.");

    await searchPage.searchPlanets("Alderaan");

    await searchPage.planets.expectCardToMatch(0, {
      name: "Alderaan",
      population: "2000000000",
      climate: "temperate",
      gravity: "1 standard",
    });
  });
});

test.describe("P1 Star Wars planet search negative flows @P1 @FullRegression", () => {
  test("shows not found for an unknown planet search", async ({
    featureFlags,
    mockSwapiEmptySearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.negativeSearch, "Negative search feature flag is disabled.");

    if (testOptions.apiMode === "mock") {
      await mockSwapiEmptySearch("planets");
    }

    await searchPage.visit();
    await searchPage.searchPlanets("Earth");
    await searchPage.notFoundMessage.expectVisible();
  });
});
