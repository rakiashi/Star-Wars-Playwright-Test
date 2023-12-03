import { Browser, Page } from '@playwright/test';
import { invokeBrowser } from '../integration-utils/browser';
import { SearchPage } from './page/searchPage'

async function globalSetup() {

    const browser: Browser = await invokeBrowser(process.env.BROWSER);
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    const searchPage = new SearchPage(page);
    await searchPage.visit();
    await browser.close();
    
}
export default globalSetup;