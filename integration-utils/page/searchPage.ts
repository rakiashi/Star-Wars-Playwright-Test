import { expect, Page } from "@playwright/test";
import { ApiErrorComponent } from "../components/apiError.component";
import { CharacterCardComponent } from "../components/characterCard.component";
import { NotFoundComponent } from "../components/notFound.component";
import { PlanetCardComponent } from "../components/planetCard.component";
import { SearchFormComponent } from "../components/searchForm.component";
import { getTestOptions } from "../env/test-options";

export class SearchPage {
  readonly searchForm: SearchFormComponent;
  readonly characters: CharacterCardComponent;
  readonly planets: PlanetCardComponent;
  readonly notFoundMessage: NotFoundComponent;
  readonly apiError: ApiErrorComponent;

  constructor(private readonly page: Page) {
    this.searchForm = new SearchFormComponent(page);
    this.characters = new CharacterCardComponent(page);
    this.planets = new PlanetCardComponent(page);
    this.notFoundMessage = new NotFoundComponent(page);
    this.apiError = new ApiErrorComponent(page);

  }

  public pageHeader = () => this.page.getByRole("heading", { name: "The Star Wars Search" });
  public pageRoot = () => this.page.locator(".container");
  public searchField = () => this.searchForm.queryInput();
  public planetRadio = () => this.searchForm.planetRadio();
  public peopleRadio = () => this.searchForm.peopleRadio();
  public searchButton = () => this.searchForm.searchButton();
  public notFound = () => this.notFoundMessage.message();

  public cardBodyByIndex = (index?:number) => `(//div[@data-testid="card-body"])${index ? `[${index}]` : ""}`;

  public cardTitleByIndex = (index?:number) => `(//h6[@data-testid="card-title"])${index ? `[${index}]` : ""}`;

  public cardRowValueByIndex = (rowIndex?:number,index?:number) => `((//div[@data-testid="row-${rowIndex || ""}"])${
    index ? `[${index}]` : ""
  }//div)[2]`;



  public async visit(path = ""): Promise<void> {
    await this.page.goto(`${getTestOptions().baseUrl}${path}`);
    await expect(this.pageHeader()).toBeVisible();
  }

  public async searchPeople(query: string): Promise<void> {
    await this.searchForm.selectPeople();
    await this.searchForm.search(query);
  }

  public async searchPlanets(query: string): Promise<void> {
    await this.searchForm.selectPlanets();
    await this.searchForm.search(query);
  }

  public async isElementDisplayed(locator: string) {
    const element = this.page.locator(locator);
    await expect(element).toBeVisible();
    return element;
  }
}
