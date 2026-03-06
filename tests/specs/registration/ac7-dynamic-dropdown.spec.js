import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC7: Dynamic dropdown behavior', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  test('should keep city dropdown empty until state is selected', async () => {
    await expect(form.stateDropdown).toContainText('Select State');
    await expect(form.cityDropdown).toContainText('Select City');
  });

  test('should allow city selection after state is selected', async ({ page }) => {
    await form.stateDropdown.click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();
    await form.cityDropdown.click();
    await expect(page.getByText('Lucknow', { exact: true })).toBeVisible();
  });

  test('should reset city after state change and block submit with stale city', async ({
    page,
  }) => {
    await form.stateDropdown.click();
    await page.getByText('NCR', { exact: true }).click();
    await form.cityDropdown.click();
    await page.getByText('Delhi', { exact: true }).click();
    await form.stateDropdown.click();
    await page.getByText('Uttar Pradesh', { exact: true }).click();

    await expect(form.cityDropdown).toContainText('Select City');
  });
});
