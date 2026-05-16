import { Page } from "@playwright/test";

export type SwapiSearchType = "people" | "planets";

export interface SwapiSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: unknown[];
}

export const buildSwapiSearchResponse = (results: unknown[]): SwapiSearchResponse => ({
  count: results.length,
  next: null,
  previous: null,
  results,
});

export const mockSwapiSearch = async (
  page: Page,
  searchType: SwapiSearchType,
  results: unknown[],
  status = 200
): Promise<void> => {
  await page.route(`https://swapi.dev/api/${searchType}/**`, async route => {
    await route.fulfill({
      status,
      contentType: "application/json",
      json: buildSwapiSearchResponse(results),
    });
  });
};

export const mockSwapiEmptySearch = async (
  page: Page,
  searchType: SwapiSearchType
): Promise<void> => mockSwapiSearch(page, searchType, []);

export const mockSwapiFailure = async (
  page: Page,
  searchType: SwapiSearchType,
  status = 500
): Promise<void> => {
  await page.route(`https://swapi.dev/api/${searchType}/**`, async route => {
    await route.fulfill({
      status,
      contentType: "application/json",
      json: {
        message: "Service unavailable",
      },
    });
  });
};

export const mockSwapiMalformedSearch = async (
  page: Page,
  searchType: SwapiSearchType
): Promise<void> => {
  await page.route(`https://swapi.dev/api/${searchType}/**`, async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      json: {
        unexpected: "shape",
      },
    });
  });
};
