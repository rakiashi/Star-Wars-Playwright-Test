import { expect, Page } from "@playwright/test";

export interface ExpectedPlanet {
  name: string;
  population: string;
  climate: string;
  gravity: string;
}

export class PlanetCardComponent {
  constructor(private readonly page: Page) {}

  card = (index = 0) => this.page.getByTestId("planet-card").nth(index);

  async expectCardToMatch(index: number, expected: ExpectedPlanet): Promise<void> {
    const card = this.card(index);
    await expect(card.getByTestId("card-title")).toHaveText(expected.name);
    await expect(card.getByTestId("row-1")).toContainText(expected.population);
    await expect(card.getByTestId("row-2")).toContainText(expected.climate);
    await expect(card.getByTestId("row-3")).toContainText(expected.gravity);
  }
}
