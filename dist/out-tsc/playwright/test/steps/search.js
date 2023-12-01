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
const cucumber_1 = require("@cucumber/cucumber");
const data_1 = require("../test-data/data");
const pageFixture_1 = require("../../helpers/pageFixture");
const searchPage_1 = require("../page/searchPage");
const test_1 = require("@playwright/test");
(0, cucumber_1.Given)('I launch local app', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixture_1.pageFixture.page.goto('http://localhost:4200');
        const pageTitle = yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.pageHeader).textContent();
        (0, test_1.expect)(pageTitle).toEqual(data_1.default.testData.pageTitle);
    });
});
(0, cucumber_1.When)('Verify default page content and people option is checked as a preference', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.peopleRadio).isChecked();
        yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.planetRadio).isVisible();
        yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.searchField).isVisible();
        yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.searchButton).isVisible();
    });
});
(0, cucumber_1.When)('Verify Not Found message', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.notFound).isVisible();
        const notFoundText = yield pageFixture_1.pageFixture.page.locator(searchPage_1.default.notFound).textContent();
        (0, test_1.expect)(notFoundText.trim()).toEqual(data_1.default.testData.notFoundText);
    });
});
(0, cucumber_1.When)(/I search for (people|planet) as "([^\s]+)"( by ENTER_KEY)?/, function (optionType, searchValue, byEnterKey) {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchPage_1.default.searchAText(optionType, searchValue, byEnterKey);
    });
});
(0, cucumber_1.Then)('then', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('then');
    });
});
(0, cucumber_1.When)('I enter new address details as {string} and save', () => __awaiter(void 0, void 0, void 0, function* () {
    // await AddNewAddressPage.addingNewAddress(newAddressKey);
}));
