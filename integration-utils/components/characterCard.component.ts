import { expect, Page } from "@playwright/test";

export interface ExpectedCharacter {
  name: string;
  gender: string;
  birthYear: string;
  eyeColor: string;
  skinColor: string;
}

export class CharacterCardComponent {
  constructor(private readonly page: Page) {}

  card = (index = 0) => this.page.getByTestId("character-card").nth(index);

  async expectCardToMatch(index: number, expected: ExpectedCharacter): Promise<void> {
    const card = this.card(index);
    await expect(card.getByTestId("card-title")).toHaveText(expected.name);
    await expect(card.getByTestId("row-1")).toContainText(expected.gender);
    await expect(card.getByTestId("row-2")).toContainText(expected.birthYear);
    await expect(card.getByTestId("row-3")).toContainText(expected.eyeColor);
    await expect(card.getByTestId("row-4")).toContainText(expected.skinColor);
  }

  async expectNameContains(index: number, expectedText: string): Promise<void> {
    await expect(this.card(index).getByTestId("card-title")).toContainText(expectedText);
  }
}
