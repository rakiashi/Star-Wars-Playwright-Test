import { appConfig } from "../../src/app/config/app.config";

export interface FeatureFlags {
  peopleSearch: boolean;
  planetSearch: boolean;
  negativeSearch: boolean;
  apiContract: boolean;
  performance: boolean;
  visualRegression: boolean;
}

const enabled = (name: string, defaultValue = true): boolean => {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

export const getFeatureFlags = (): FeatureFlags => ({
  peopleSearch: enabled("FEATURE_PEOPLE_SEARCH", appConfig.features.peopleSearch),
  planetSearch: enabled("FEATURE_PLANET_SEARCH", appConfig.features.planetSearch),
  negativeSearch: enabled("FEATURE_NEGATIVE_SEARCH"),
  apiContract: enabled("FEATURE_API_CONTRACT"),
  performance: enabled("FEATURE_PERFORMANCE", false),
  visualRegression: enabled("FEATURE_VISUAL_REGRESSION"),
});
