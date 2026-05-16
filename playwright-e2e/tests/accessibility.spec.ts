import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";
import { test } from "../../integration-utils/fixtures/base.page";
import { getTestOptions } from "../../integration-utils/env/test-options";
import { swapiFixtures } from "../../integration-utils/test-data/swapi.fixtures";

const testOptions = getTestOptions();

test.describe("P1 accessibility flows @P1 @A11y", () => {
  test("has no critical accessibility violations on the default search page", async ({ page, searchPage }) => {
    await searchPage.visit();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("has no critical accessibility violations after rendering search results", async ({
    page,
    mockSwapiSearch,
    searchPage,
  }) => {
    if (testOptions.apiMode === "mock") {
      await mockSwapiSearch("people", [swapiFixtures.people.lukeSkywalker]);
    }

    await searchPage.visit();
    await searchPage.searchPeople("Luke Skywalker");
    await searchPage.characters.expectCardToMatch(0, {
      name: "Luke Skywalker",
      gender: "male",
      birthYear: "19BBY",
      eyeColor: "blue",
      skinColor: "fair",
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
