import { test as base } from "@playwright/test";
import { getFeatureFlags, FeatureFlags } from "../feature-flags/featureFlags";
import { mockSwapiEmptySearch, mockSwapiFailure, mockSwapiMalformedSearch, mockSwapiSearch, SwapiSearchType } from "../mocks/swapi.mock";
import { SearchPage } from "../page/searchPage";

type SwapiMock = (searchType: SwapiSearchType, results: unknown[]) => Promise<void>;
type EmptySwapiMock = (searchType: SwapiSearchType) => Promise<void>;
type FailureSwapiMock = (searchType: SwapiSearchType, status?: number) => Promise<void>;
type MalformedSwapiMock = (searchType: SwapiSearchType) => Promise<void>;

export const test = base.extend<{
  featureFlags: FeatureFlags;
  mockSwapiSearch: SwapiMock;
  mockSwapiEmptySearch: EmptySwapiMock;
  mockSwapiFailure: FailureSwapiMock;
  mockSwapiMalformedSearch: MalformedSwapiMock;
  searchPage: SearchPage;
}>({
  featureFlags: async ({}, use) => {
    await use(getFeatureFlags());
  },
  mockSwapiSearch: async ({ page }, use) => {
    await use((searchType, results) => mockSwapiSearch(page, searchType, results));
  },
  mockSwapiEmptySearch: async ({ page }, use) => {
    await use(searchType => mockSwapiEmptySearch(page, searchType));
  },
  mockSwapiFailure: async ({ page }, use) => {
    await use((searchType, status = 500) => mockSwapiFailure(page, searchType, status));
  },
  mockSwapiMalformedSearch: async ({ page }, use) => {
    await use(searchType => mockSwapiMalformedSearch(page, searchType));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  }
});
