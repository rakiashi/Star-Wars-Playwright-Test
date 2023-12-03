import { Page, expect } from "@playwright/test";
import data from '../test-data/data.json';
import { ConfigReader } from "../configReader/config.reader";

export class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  /**
   * define selector by getting from locator folder based on page 
   */

  public pageHeader = () => this.page.locator('//h1');
  public searchField = () => this.page.locator('//input[@id="query"]');
  public planetRadio = () => this.page.locator('//input[@id="planets"]');
  public peopleRadio = () => this.page.locator('//input[@id="people"]');
  public searchButton = () => this.page.locator('//button[@type="submit"]');
  public notFound = () =>
    this.page
      .locator('//div[@data-testid="not-found"]')
      .getByText(data.testData.notFoundText);

  public cardBodyByIndex = (index?:number) => `(//div[@data-testid="card-body"])${index ? `[${index}]` : ""}`;

  public cardTitleByIndex = (index?:number) => `(//h6[@data-testid="card-title"])${index ? `[${index}]` : ""}`;

  public cardRowValueByIndex = (rowIndex?:number,index?:number) => `((//div[@data-testid="row-${rowIndex || ""}"])${
    index ? `[${index}]` : ""
  }//div)[2]`;



  public async visit() {
    await this.page.waitForTimeout(5000); // this is to wait for local app to stable for github ci
    await this.page.goto(ConfigReader.getEnvVars().BASE_URL);
    await this.pageHeader().isVisible();
  }

  public async isElementDisplayed(locator: string) {
    const element = await this.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    return element;
  }

  public async expectActualContainsExpected(locator: string, expectedText: string) {
    const element = await this.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    if (!element) throw new Error(`Could not find selector: "${locator}"`);
    return expect((await element.textContent()).trim()).toContain(expectedText);
  }
}
