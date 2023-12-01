import { BeforeAll, Before, After , AfterAll, Status } from '@cucumber/cucumber';
import {  Browser , BrowserContext } from '@playwright/test';
import { pageFixture } from '../helpers/pageFixture';
import { invokeBrowser } from './browser';

let browser : Browser;
let context : BrowserContext;

BeforeAll(async function() {
 browser = await invokeBrowser(process.env.BROWSER);
})

Before(async function() {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
})

After(async function({pickle, result}) {
    if (result?.status == Status.FAILED) {
        const failedImage = await pageFixture.page.screenshot({ path:`./test-results/screenshot/${pickle.name}.png`,})
        await this.attach(failedImage,"image/png");
    }
   await pageFixture.page.close();
   await context.close();
})

AfterAll(async function () {
    await browser.close();
})