
import { Then , setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../../helpers/pageFixture';
import { expect  } from '@playwright/test';
import locatorHandler from '../../helpers/common/locator-handler';
import searchLocators from '../../../common/locators/searchLocators';

setDefaultTimeout(6*1000)


interface Planet {
    Population: string;
    Climate: string;
    Gravity: string;
  }

  let asteroid: Planet[];

Then('Verify details of search results from below table', async function (dataTable) {
    await locatorHandler.isElementDisplayed(searchLocators.cardBodyByIndex(2));
    const expectedCardTitle = dataTable.rows()[0];
    await locatorHandler.assertExpectVsActual(searchLocators.cardTitleByIndex(1),expectedCardTitle[1]);
    console.log(dataTable.rows().length);
    for (let row = 1; row <= dataTable.rows().length-1; row += 1) {
        const cardList = dataTable.rows()[row];
        const actualValue = (await pageFixture.page.locator(searchLocators.cardRowValueByIndex(row,1)).textContent()).trim();
        expect(actualValue.trim()).toEqual(cardList[1]);
    }
});


Then(/Verify details of search results of planet from below table/, async function (dataTable) {
    await locatorHandler.isElementDisplayed(searchLocators.cardBodyByIndex(2));
    asteroid = dataTable.hashes();
    for (const value of asteroid) {
        const population = (await pageFixture.page.locator(searchLocators.cardFirstRowByIndex(1)).textContent()).trim();
        expect(population.trim()).toEqual(value.Population);
        const climate = (await pageFixture.page.locator(searchLocators.cardSecondRowByIndex(1)).textContent()).trim();
        expect(climate.trim()).toEqual(value.Climate);
        const gravity = (await pageFixture.page.locator(searchLocators.cardThirdRowByIndex(1)).textContent()).trim();
        expect(gravity.trim()).toEqual(value.Gravity);
      }
});
