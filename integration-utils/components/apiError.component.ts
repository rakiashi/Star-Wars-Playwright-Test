import { expect, Page } from "@playwright/test";

export class ApiErrorComponent {
  constructor(private readonly page: Page) {}

  message = () => this.page.getByTestId("api-error");

  async expectVisible(): Promise<void> {
    await expect(this.message()).toHaveText("Search failed.");
  }
}
