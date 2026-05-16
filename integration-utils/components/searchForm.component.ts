import { expect, Page } from "@playwright/test";

export class SearchFormComponent {
  constructor(private readonly page: Page) {}

  root = () => this.page.getByTestId("search-form");
  peopleRadio = () => this.page.getByLabel("People");
  planetRadio = () => this.page.getByLabel("Planets");
  queryInput = () => this.page.getByLabel("Query");
  searchButton = () => this.page.getByRole("button", { name: "Search" });

  async expectDefaultState(): Promise<void> {
    await expect(this.peopleRadio()).toBeChecked();
    await expect(this.root()).toBeVisible();
    await expect(this.queryInput()).toBeVisible();
    await expect(this.searchButton()).toBeVisible();
  }

  async selectPeople(): Promise<void> {
    await this.peopleRadio().check();
  }

  async selectPlanets(): Promise<void> {
    await this.planetRadio().check();
  }

  async search(query: string): Promise<void> {
    await this.queryInput().fill(query);
    await this.searchButton().click();
  }
}
