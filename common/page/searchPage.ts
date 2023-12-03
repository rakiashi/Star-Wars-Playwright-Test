import { Page, expect } from "@playwright/test";
import SearchLocators from '../locators/searchLocators'
import data from '../../common/test-data/data.json';
import { ConfigReader } from "../configReader/config.reader";

export class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  /**
   * define selector by getting from locator folder based on page 
   */

  private pageHeader = () => this.page.locator(SearchLocators.pageHeader);
  private searchField = () => this.page.locator(SearchLocators.searchField);
  private planetRadio = () => this.page.locator(SearchLocators.planetRadio);
  private peopleRadio = () => this.page.locator(SearchLocators.peopleRadio);
  private searchButton = () => this.page.locator(SearchLocators.searchButton);
  private notFound = () =>
    this.page
      .locator(SearchLocators.notFound)
      .getByText(data.testData.notFoundText);

  public cardBodyByIndex = (index?: number) =>
    this.page.locator(SearchLocators.cardBodyByIndex(index));
  public cardTitleByIndex = (index?: number) =>
    this.page.locator(SearchLocators.cardTitleByIndex(index));

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to search people or planet by name as searchText
   * optionType as people / planet
   * clickType either by mouse click or key-board action ENTER_KEY
   */
  public async searchByName(
    optionType: string,
    searchText: string,
    clickType: string
  ) {
    await this.searchField().isVisible();
    const peopleStatus = await this.peopleRadio().isChecked();
    const planetStatus = await this.planetRadio().isChecked();
    if (optionType === "people" && !peopleStatus) {
      await this.peopleRadio().click();
      await this.peopleRadio().isChecked();
    } else if (optionType === "planet" && !planetStatus) {
      await this.planetRadio().click();
      await this.planetRadio().isChecked();
    }
    if (searchText) {
      await this.searchField().fill(searchText);
    }
    if (clickType === "by ENTER_KEY") {
      await this.page.keyboard.press("Enter");
    } else {
      await this.searchButton().click();
    }
  }

  public async visit() {
    await this.page.waitForTimeout(5000); // this is to wait for local app to stable for github ci
    await this.page.goto(ConfigReader.getEnvVars().BASE_URL);
    await this.pageHeader().isVisible();
  }

  public async verifyDefaultSearchContent() {
    await this.peopleRadio().isChecked();
    await this.planetRadio().isVisible();
    await this.searchField().isVisible();
    await this.searchButton().isVisible();
  }

  public async verifyNotFoundMessage() {
    await this.notFound().waitFor();
    await this.notFound().isVisible();
  }

  public async verifyPlanetSearchResult(userDetails) {
    await this.cardBodyByIndex(2).waitFor();
    await this.cardBodyByIndex(2).isVisible();
    expect(await this.getText(SearchLocators.cardFirstRowByIndex(1))).toEqual(userDetails.population);
    expect(await this.getText(SearchLocators.cardSecondRowByIndex(1))).toEqual(userDetails.climate);
    expect(await this.getText(SearchLocators.cardThirdRowByIndex(1))).toEqual(userDetails.gravity);
  }

  public async verifyPeopleSearchResult(userDetails) {
    await this.cardBodyByIndex(2).waitFor();
    await this.cardTitleByIndex(1).isVisible();
    expect(await this.getText(SearchLocators.cardFirstRowByIndex(1))).toEqual(userDetails.gender);
    expect(await this.getText(SearchLocators.cardSecondRowByIndex(1))).toEqual(userDetails.birthyYear);
    expect(await this.getText(SearchLocators.cardThirdRowByIndex(1))).toEqual(userDetails.eyeColor);
    expect(await this.getText(SearchLocators.cardFourthRowByIndex(1))).toEqual(userDetails.skinColor);
  }

  public async clearSearchTextAndClick() {
    await this.searchField().clear();
    await this.searchButton().click();
    await this.notFound().waitFor();
    await this.notFound().isVisible();
  }

  public async getText(locator) {
    return (await this.page.locator(locator).textContent()).trim();
  }
}
