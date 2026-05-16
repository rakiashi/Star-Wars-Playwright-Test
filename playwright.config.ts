import { defineConfig, devices } from "@playwright/test";
import { getTestOptions } from "./integration-utils/env/test-options";

const testOptions = getTestOptions();

export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: false,
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}.png",
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  timeout: 90 * 1000,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
    },
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: `ui-${testOptions.apiMode}`,
      testDir: "playwright-e2e/tests",
      use: {
        baseURL: testOptions.baseUrl,
        browserName: "chromium",
        trace: "on-first-retry",
        headless: testOptions.headless,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        viewport: { width: 1920, height: 1080 },
      }
    },
    {
      name: `ui-${testOptions.apiMode}-mobile`,
      testDir: "playwright-e2e/tests",
      grep: /@P0/,
      grepInvert: /@Visual/,
      use: {
        ...devices["Pixel 5"],
        baseURL: testOptions.baseUrl,
        browserName: "chromium",
        trace: "on-first-retry",
        headless: testOptions.headless,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      }
    },
    {
      name: `ui-${testOptions.apiMode}-firefox`,
      testDir: "playwright-e2e/tests",
      grep: /@P0/,
      grepInvert: /@Visual/,
      use: {
        baseURL: testOptions.baseUrl,
        browserName: "firefox",
        trace: "on-first-retry",
        headless: testOptions.headless,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        viewport: { width: 1920, height: 1080 },
      }
    },
    {
      name: `ui-${testOptions.apiMode}-webkit`,
      testDir: "playwright-e2e/tests",
      grep: /@P0/,
      grepInvert: /@Visual/,
      use: {
        baseURL: testOptions.baseUrl,
        browserName: "webkit",
        trace: "on-first-retry",
        headless: testOptions.headless,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        viewport: { width: 1920, height: 1080 },
      }
    },
    {
      name: "api-contract",
      testDir: "playwright-e2e/api",
      use: {
        baseURL: testOptions.apiBaseUrl,
        ignoreHTTPSErrors: testOptions.ignoreHttpsErrors,
      }
    }
  ],
  webServer: testOptions.environment === "local" ? {
    command: "npm run start",
    url: testOptions.baseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  } : undefined,
});
