
import locatorHandler from "../../helpers/common/locator-handler";
import { pageFixture } from "../../helpers/pageFixture";

class SearchPage {
  /**
   * define selectors using getter methods for search page
   */
  get pageHeader() {
    return "//h1";
  }
  get searchField() {
    return '//input[@id="query"]';
  }
  get planetRadio() {
    return '//input[@id="planets"]';
  }
  get peopleRadio() {
    return '//input[@id="people"]';
  }
  get searchButton() {
    return '//button[@type="submit"]';
  }
  get notFound() {
    return '//div[@data-testid="not-found"]';
  }

  /**
   * define selectors using getter methods for search result card body by row
   */
  cardBodyByIndex(index?: number) {
    return `(//div[@data-testid="card-body"])${index ? `[${index}]` : ""}`;
  }
  cardTitleByIndex(index?: number) {
    return `(//h6[@data-testid="card-title"])${index ? `[${index}]` : ""}`;
  }
  cardFirstRowByIndex(index?: number) {
    return `((//div[@data-testid="first-row"])${
      index ? `[${index}]` : ""
    })[1]//div)[2]`;
  }
  cardSecondRowByIndex(index?: number) {
    return `((//div[@data-testid="second-row"])${
      index ? `[${index}]` : ""
    })[2]//div)[2]`;
  }
  cardThirdRowByIndex(index?: number) {
    return `((//div[@data-testid="third-row"])${
      index ? `[${index}]` : ""
    })[3]//div)[2]`;
  }
  cardFourthRowByIndex(index?: number) {
    return `((//div[@data-testid="fourth-row"])${
      index ? `[${index}]` : ""
    })[4]//div)[2]`;
  }

  cardRowValueByIndex(rowIndex?: number, index?: number) {
    return `((//div[@data-testid="row-${rowIndex || ""}"])${
      index ? `[${index}]` : ""
    }//div)[2]`;
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  async searchAText(optionType: string, searchText: string, clickType: string) {
    await locatorHandler.isElementDisplayed(this.searchField);
    const peopleStatus = await pageFixture.page
      .locator(this.peopleRadio)
      .isChecked();
    const planetStatus = await pageFixture.page
      .locator(this.planetRadio)
      .isChecked();
    if (optionType === "people" && !peopleStatus) {
      await locatorHandler.waitAndClick(this.peopleRadio);
      await pageFixture.page.locator(this.peopleRadio).isChecked();
    } else if (optionType === "planet" && !planetStatus) {
      await locatorHandler.waitAndClick(this.planetRadio);
      await pageFixture.page.locator(this.planetRadio).isChecked();
    }
    if (searchText) {
      await locatorHandler.safeType(this.searchField,searchText);
    }
    if (clickType === "by ENTER_KEY") {
      await pageFixture.page.keyboard.press("Enter");
    } else {
      await locatorHandler.waitAndClick(this.searchButton);
    }
  }
}
export default new SearchPage();
