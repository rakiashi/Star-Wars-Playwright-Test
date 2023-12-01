
import { Then , setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../../helpers/pageFixture';
import searchPage from '../page/searchPage';
import { expect } from '@playwright/test';
import locatorHandler from '../../helpers/common/locator-handler';

setDefaultTimeout(6*1000)

Then('Verify details of search results from below table', async function (dataTable) {
    await locatorHandler.isElementDisplayed(searchPage.cardBodyByIndex(2));
    const expectedCardTitle = dataTable.rows()[0];
    await locatorHandler.assertExpectVsActual(searchPage.cardTitleByIndex(1),expectedCardTitle[1]);
    console.log(dataTable.rows().length);
    for (let row = 1; row <= dataTable.rows().length-1; row += 1) {
        const cardList = dataTable.rows()[row];
        const actualValue = (await pageFixture.page.locator(searchPage.cardRowValueByIndex(row,1)).textContent()).trim();
        expect(actualValue.trim()).toEqual(cardList[1]);
    }
});
