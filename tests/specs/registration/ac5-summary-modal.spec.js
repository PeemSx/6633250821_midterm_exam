import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';
import { validStudent, validSummaryCases } from '../../fixtures/inputData.js';
import { fillMandatory, summaryCheck } from '../../utils/form.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC5: Submission modal shows exact entered data', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  for (const caseData of validSummaryCases) {
    test(`should show exact summary for ${caseData.firstName} (${caseData.state})`, async ({
      page,
    }) => {
      await fillMandatory(form, caseData);
      await form.mobileInput.fill(caseData.mobile);
      await form.stateDropdown.click();
      await page.getByText(caseData.state, { exact: true }).click();
      await form.cityDropdown.click();
      await page.getByText(caseData.city, { exact: true }).click();

      await form.submitButton.click();

      await summaryCheck(form, caseData);
    });
  }

  test('should return to blank form after clicking Close on success modal', async ({ page }) => {
    await fillMandatory(form, validStudent);
    await form.mobileInput.fill(validStudent.mobile);
    await form.stateDropdown.click();
    await page.getByText(validStudent.state, { exact: true }).click();
    await form.cityDropdown.click();
    await page.getByText(validStudent.city, { exact: true }).click();

    await form.submitButton.click();
    await expect(form.modalTitle).toBeVisible();

    await expect(form.closeModalButton).toBeVisible();
    await form.closeModalButton.click();

    await expect(form.modalTitle).not.toBeVisible();
    await expect(form.firstNameInput).toHaveValue('');
    await expect(form.lastNameInput).toHaveValue('');
    await expect(form.emailInput).toHaveValue('');
    await expect(form.mobileInput).toHaveValue('');
    await expect(form.stateDropdown).toContainText('Select State');
    await expect(form.cityDropdown).toContainText('Select City');
  });
});
