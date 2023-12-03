import { LaunchOptions, chromium, firefox } from "@playwright/test";

const options: LaunchOptions = {
  headless: JSON.parse(process.env.HEADLESS)
};

export const invokeBrowser = (browserType) => {
  
  switch (browserType) {
    case "chrome":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
      default:
        throw new Error("Please define the correct browser")
  }
};
