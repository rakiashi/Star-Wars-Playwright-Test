import { expect } from "@playwright/test";
import { test } from "../../integration-utils/fixtures/base.page";
import { getTestOptions } from "../../integration-utils/env/test-options";
import { buildMaskedVisualOptions } from "../../integration-utils/visual/visual-options";
import { swapiFixtures } from "../../integration-utils/test-data/swapi.fixtures";

const testOptions = getTestOptions();

test.describe("P1 visual regression flows @P1 @Visual", () => {
  test.skip(testOptions.apiMode !== "mock", "Visual baselines must run with deterministic mocked data.");

  test("matches the default search page visual baseline with the input masked", async ({
    featureFlags,
    searchPage,
  }) => {
    test.skip(!featureFlags.visualRegression, "Visual regression feature flag is disabled.");

    await searchPage.visit();

    await expect(searchPage.pageRoot()).toHaveScreenshot(
      "default-search-page.png",
      buildMaskedVisualOptions([searchPage.searchForm.queryInput()])
    );
  });

  test("matches the people result visual baseline with user input masked", async ({
    featureFlags,
    mockSwapiSearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.visualRegression, "Visual regression feature flag is disabled.");

    await mockSwapiSearch("people", [swapiFixtures.people.lukeSkywalker]);
    await searchPage.visit("/?searchType=people&query=Luke%20Skywalker");
    await searchPage.characters.expectCardToMatch(0, {
      name: "Luke Skywalker",
      gender: "male",
      birthYear: "19BBY",
      eyeColor: "blue",
      skinColor: "fair",
    });

    await expect(searchPage.pageRoot()).toHaveScreenshot(
      "people-search-result.png",
      buildMaskedVisualOptions([searchPage.searchForm.queryInput()])
    );
  });

  test("matches the planet result component visual baseline", async ({
    featureFlags,
    mockSwapiSearch,
    searchPage,
  }) => {
    test.skip(!featureFlags.visualRegression, "Visual regression feature flag is disabled.");

    await mockSwapiSearch("planets", [swapiFixtures.planets.alderaan]);
    await searchPage.visit("/?searchType=planets&query=Alderaan");
    await searchPage.planets.expectCardToMatch(0, {
      name: "Alderaan",
      population: "2000000000",
      climate: "temperate",
      gravity: "1 standard",
    });

    await expect(searchPage.planets.card(0)).toHaveScreenshot(
      "planet-result-card.png",
      buildMaskedVisualOptions()
    );
  });
});
