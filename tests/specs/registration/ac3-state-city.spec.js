import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';
import { stateCityCases } from '../../fixtures/inputData.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC3: City options depend on selected State', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  for (const caseData of stateCityCases) {
    test(`should show only ${caseData.state} cities (sampled)`, async ({ page }) => {
      await form.stateDropdown.click();
      await page.getByText(caseData.state, { exact: true }).click();
      await form.cityDropdown.click();

      for (const city of caseData.expectedCities) {
        await expect(page.getByText(city, { exact: true })).toBeVisible();
      }
      await expect(page.getByText(caseData.unexpectedCity, { exact: true })).not.toBeVisible();
    });
  }
});
