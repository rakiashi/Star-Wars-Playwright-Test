import { LaunchOptions, chromium, firefox } from "@playwright/test";

const options: LaunchOptions = {
  headless: false,
};

export const invokeBrowser = (browserType) => {
  // const browserType = process.env.BROWSER
  switch (browserType) {
    case "chrome":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
      default:
        throw new Error("Please define the correct browser")
  }
};
