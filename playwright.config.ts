import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: "common/globalsetup.ts",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects: [
    {
      name: "playwright-test-runner",
      testDir: "playwright-test-runner/tests",
      use: {
        browserName: "chromium",
        trace: "on-first-retry",
        headless: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        viewport: { width: 1920, height: 1080 },
      }
    }
  ],
 webServer: {
  command: 'npm run start',
  timeout: 120 * 1000,
}
});
