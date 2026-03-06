import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';
import { validStudent } from '../../fixtures/inputData.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC1: User can submit with valid data', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  test('should show success modal after submit all fields', async ({ page }) => {
    const picturePath = '../fixtures/files/profile.png';
    await form.firstNameInput.fill(validStudent.firstName);
    await form.lastNameInput.fill(validStudent.lastName);
    await form.emailInput.fill(validStudent.email);
    await form.genderMale.click();
    await form.mobileInput.fill(validStudent.mobile);
    await form.dateOfBirthInput.fill(validStudent.dateOfBirth);
    await form.dateOfBirthInput.press('Enter');
    await form.subjectsInput.fill(validStudent.subject);
    await page.locator('.subjects-auto-complete__option').first().click();
    await form.hobbySports.click();
    await form.hobbyMusic.click();
    await form.uploadPictureInput.setInputFiles(picturePath);
    await form.currentAddressInput.fill(validStudent.currentAddress);
    await form.stateDropdown.click();
    await page.getByText(validStudent.state, { exact: true }).click();
    await form.cityDropdown.click();
    await page.getByText(validStudent.city, { exact: true }).click();

    await form.submitButton.click();

    await expect(form.modalTitle).toBeVisible();
  });

  test('should show success modal after submit only mandatory fields', async () => {
    await form.firstNameInput.fill(validStudent.firstName);
    await form.lastNameInput.fill(validStudent.lastName);
    await form.emailInput.fill(validStudent.email);
    await form.genderMale.click();
    await form.mobileInput.fill(validStudent.mobile);

    await form.submitButton.click();

    await expect(form.modalTitle).toBeVisible();
  });
});
