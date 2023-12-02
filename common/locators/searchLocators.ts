export class SearchLocators {
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
      return `((//div[@data-testid="row-1"])${
        index ? `[${index}]` : ""
      }//div)[2]`;
    }
    cardSecondRowByIndex(index?: number) {
      return `((//div[@data-testid="row-2"])${
        index ? `[${index}]` : ""
      }//div)[2]`;
    }
    cardThirdRowByIndex(index?: number) {
      return `((//div[@data-testid="row-3"])${
        index ? `[${index}]` : ""
      }//div)[2]`;
    }
    cardFourthRowByIndex(index?: number) {
      return `((//div[@data-testid="row-4"])${
        index ? `[${index}]` : ""
      }//div)[2]`;
    }
  
    cardRowValueByIndex(rowIndex?: number, index?: number) {
      return `((//div[@data-testid="row-${rowIndex || ""}"])${
        index ? `[${index}]` : ""
      }//div)[2]`;
    }
}
export default new SearchLocators();