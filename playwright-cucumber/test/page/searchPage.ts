
import searchLocators from "../../../common/locators/searchLocators";
import locatorHandler from "../../helpers/common/locator-handler";
import { pageFixture } from "../../helpers/pageFixture";

class SearchPage {
  // /**
  //  * define selectors using getter methods for search page
  //  */
  // get pageHeader() {
  //   return "//h1";
  // }
  // get searchField() {
  //   return '//input[@id="query"]';
  // }
  // get planetRadio() {
  //   return '//input[@id="planets"]';
  // }
  // get peopleRadio() {
  //   return '//input[@id="people"]';
  // }
  // get searchButton() {
  //   return '//button[@type="submit"]';
  // }
  // get notFound() {
  //   return '//div[@data-testid="not-found"]';
  // }

  /**
   * define selectors using getter methods for search result card body by row
   */
  // cardBodyByIndex(index?: number) {
  //   return searchLocators.cardBodyByIndex(index);
  // }
  // cardTitleByIndex(index?: number) {
  //   return `(//h6[@data-testid="card-title"])${index ? `[${index}]` : ""}`;
  // }
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  async searchAText(optionType: string, searchText: string, clickType: string) {
    await locatorHandler.isElementDisplayed(searchLocators.searchField);
    const peopleStatus = await pageFixture.page
      .locator(searchLocators.peopleRadio)
      .isChecked();
    const planetStatus = await pageFixture.page
      .locator(searchLocators.planetRadio)
      .isChecked();
    if (optionType === "people" && !peopleStatus) {
      await locatorHandler.waitAndClick(searchLocators.peopleRadio);
      await pageFixture.page.locator(searchLocators.peopleRadio).isChecked();
    } else if (optionType === "planet" && !planetStatus) {
      await locatorHandler.waitAndClick(searchLocators.planetRadio);
      await pageFixture.page.locator(searchLocators.planetRadio).isChecked();
    }
    if (searchText) {
      await locatorHandler.safeType(searchLocators.searchField,searchText);
    }
    if (clickType === "by ENTER_KEY") {
      await pageFixture.page.keyboard.press("Enter");
    } else {
      await locatorHandler.waitAndClick(searchLocators.searchButton);
    }
  }
}
export default new SearchPage();
