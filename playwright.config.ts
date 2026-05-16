import { defineConfig, devices } from "@playwright/test";
import { getTestOptions } from "./integration-utils/env/test-options";

const testOptions = getTestOptions();
const defaultVisualMaxDiffPixelRatio = process.env.CI ? 0.05 : 0.01;
const defaultVisualThreshold = process.env.CI ? 0.25 : 0.2;
const visualMaxDiffPixelRatio = process.env.VISUAL_MAX_DIFF_PIXEL_RATIO
  ? Number(process.env.VISUAL_MAX_DIFF_PIXEL_RATIO)
  : defaultVisualMaxDiffPixelRatio;
const visualThreshold = process.env.VISUAL_THRESHOLD
  ? Number(process.env.VISUAL_THRESHOLD)
  : defaultVisualThreshold;

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
      maxDiffPixelRatio: visualMaxDiffPixelRatio,
      threshold: visualThreshold,
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
