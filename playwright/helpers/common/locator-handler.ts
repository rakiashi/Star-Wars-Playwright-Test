import { expect } from "@playwright/test";
import { pageFixture } from "../pageFixture";

class LocatorHandler {

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  public async isElementDisplayed(locator: string) {
    const element = await pageFixture.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    return element;
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  public async waitAndClick(locator: string) {
    const element = await pageFixture.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    await element.click();
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  public async safeType(locator: string, valueToFill: string) {
    const element = await pageFixture.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    await element.fill(valueToFill);
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to assert expected vs actual text comparsion
   */
  public async assertExpectVsActual(locator: string, expectedText: string) {
    const element = await pageFixture.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    return expect((await element.textContent()).trim()).toEqual(expectedText);
  }
}
export default new LocatorHandler();
