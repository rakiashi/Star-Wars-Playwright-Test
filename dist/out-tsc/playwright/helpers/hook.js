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
const test_1 = require("@playwright/test");
const pageFixture_1 = require("../helpers/pageFixture");
let browser;
let context;
(0, cucumber_1.BeforeAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield test_1.chromium.launch({ headless: false });
    });
});
(0, cucumber_1.Before)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        context = yield browser.newContext();
        const page = yield context.newPage();
        pageFixture_1.pageFixture.page = page;
    });
});
(0, cucumber_1.After)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // if (result?.status == result.status.FAILED) {
        //     const failedImage = await pageFixture.page.screenshot({ path:`./test-result/screenshot/${pickle.name}.png`,})
        //     await this.attach(failedImage,"image/png");
        // }
        yield pageFixture_1.pageFixture.page.close();
        yield context.close();
    });
});
(0, cucumber_1.AfterAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield browser.close();
    });
});
