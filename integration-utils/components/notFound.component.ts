import { expect, Page } from "@playwright/test";

export class NotFoundComponent {
  constructor(private readonly page: Page) {}

  message = () => this.page.getByTestId("not-found");

  async expectVisible(): Promise<void> {
    await expect(this.message()).toHaveText("Not found.");
  }
}
