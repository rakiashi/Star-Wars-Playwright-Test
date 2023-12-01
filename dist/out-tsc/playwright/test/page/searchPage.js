"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pageFixture_1 = require("../../helpers/pageFixture");
class SearchPage {
    /**
     * define selectors using getter methods for search page
     */
    get pageHeader() { return ('//h1'); }
    get searchField() { return ('//input[@id="query"]'); }
    get planetRadio() { return ('//input[@id="planets"]'); }
    get peopleRadio() { return ('//input[@id="people"]'); }
    get searchButton() { return ('//button[@type="submit"]'); }
    get notFound() { return ('//div[@data-testid="not-found"]'); }
    /**
    * define selectors using getter methods for search result card body by row
    */
    cardBodyByIndex(index) { return (`//div[@data-testid="card-body"]${index ? `[${index}]` : ''}`); }
    cardTitileByindex(index) { return (`//div[@data-testid="card-title"]${index ? `[${index}]` : ''}`); }
    cardFirstRowByIndex(index) { return (`((//div[@data-testid="first-row"])${index ? `[${index}]` : ''})[1]//div)[2]`); }
    cardSecondRowByIndex(index) { return (`((//div[@data-testid="second-row"])${index ? `[${index}]` : ''})[3]//div)[2]`); }
    cardThirdRowByIndex(index) { return (`((//div[@data-testid="third-row"])${index ? `[${index}]` : ''})[3]//div)[2]`); }
    cardFourthRowByIndex(index) { return (`((//div[@data-testid="fourth-row"])${index ? `[${index}]` : ''})[4]//div)[2]`); }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to search using a saearch value
     */
    searchAText(optionType, searchText, clickType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageFixture_1.pageFixture.page.locator(this.searchField).isVisible();
            const peopleStatus = yield pageFixture_1.pageFixture.page.locator(this.peopleRadio).isChecked();
            const planetStatus = yield pageFixture_1.pageFixture.page.locator(this.planetRadio).isChecked();
            if (optionType === 'people' && !peopleStatus) {
                yield pageFixture_1.pageFixture.page.locator(this.peopleRadio).click();
                yield pageFixture_1.pageFixture.page.locator(this.peopleRadio).isChecked();
            }
            else if (optionType === 'planet' && !planetStatus) {
                yield pageFixture_1.pageFixture.page.locator(this.planetRadio).click();
                yield pageFixture_1.pageFixture.page.locator(this.planetRadio).isChecked();
            }
            yield pageFixture_1.pageFixture.page.locator(this.searchField).fill(searchText);
            if (clickType === 'by ENTER_KEY') {
                yield pageFixture_1.pageFixture.page.keyboard.press('Enter');
                console.log(clickType);
            }
            else {
                // await pageFixture.page.locator(this.searchButton).click();
            }
        });
    }
}
exports.default = new SearchPage();
