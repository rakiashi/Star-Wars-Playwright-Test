import { Browser, chromium, Page } from '@playwright/test';
// import { ConfigReader } from "./config-reader/config.reader";
import { SearchPage } from '../common/page/searchPage'

async function globalSetup() {

    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    const searchPage = new SearchPage(page);
    await searchPage.visit();
    await browser.close();
    
}
export default globalSetup;