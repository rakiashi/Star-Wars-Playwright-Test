import { expect, test } from "@playwright/test";
import { getFeatureFlags } from "../../integration-utils/feature-flags/featureFlags";
import { swapiPeopleSearchResponseSchema, swapiPlanetSearchResponseSchema } from "../../integration-utils/contracts/swapi.schemas";

const featureFlags = getFeatureFlags();

test.describe("SWAPI search API contract @APIContract", () => {
  test.skip(!featureFlags.apiContract, "API contract feature flag is disabled.");

  test("people search returns the fields used by the character component", async ({ request }) => {
    const response = await request.get("people/", {
      params: { search: "Luke Skywalker" },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(() => swapiPeopleSearchResponseSchema.parse(responseBody)).not.toThrow();
  });

  test("planet search returns the fields used by the planet component", async ({ request }) => {
    const response = await request.get("planets/", {
      params: { search: "Alderaan" },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(() => swapiPlanetSearchResponseSchema.parse(responseBody)).not.toThrow();
  });
});
