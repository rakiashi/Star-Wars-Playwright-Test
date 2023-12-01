
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {      
        BROWSER: "chrome" | "firefox",
        ENV: "local" | "L6",
        HEADLESS: "true" | "false",
        npm_config_TAGS: "test" | "searchPlanet" | "searchPeople"
      }
  }
}