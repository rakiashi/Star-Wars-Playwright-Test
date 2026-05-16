import { ConfigReader } from "../configReader/config.reader";

export type ApiMode = "mock" | "real";
export type TestEnvironment = "local" | "development" | "L6";

export interface TestOptions {
  apiMode: ApiMode;
  baseUrl: string;
  apiBaseUrl: string;
  environment: TestEnvironment;
  headless: boolean;
  ignoreHttpsErrors: boolean;
}

const booleanFromEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === "true";
};

export const getTestOptions = (): TestOptions => {
  const environment = (process.env.ENV || "local") as TestEnvironment;
  const envVars = ConfigReader.getEnvVars(environment);
  const apiMode = (process.env.API_MODE || "mock") as ApiMode;
  const apiBaseUrl = process.env.API_BASE_URL || envVars.API_BASE_URL || "https://swapi.dev/api";

  if (!["mock", "real"].includes(apiMode)) {
    throw new Error(`Invalid API_MODE: ${apiMode}. Use "mock" or "real".`);
  }

  return {
    apiMode,
    baseUrl: process.env.BASE_URL || envVars.BASE_URL,
    apiBaseUrl: apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`,
    environment,
    headless: booleanFromEnv(process.env.HEADLESS, true),
    ignoreHttpsErrors: booleanFromEnv(process.env.IGNORE_HTTPS_ERRORS, false),
  };
};
