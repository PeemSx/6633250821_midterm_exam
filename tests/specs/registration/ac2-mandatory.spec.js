import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';
import { validStudent } from '../../fixtures/inputData.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC2: Mandatory fields cannot be blank', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  test('should block submit when First Name is blank', async () => {
    await form.lastNameInput.fill(validStudent.lastName);
    await form.emailInput.fill(validStudent.email);
    await form.genderMale.click();
    await form.mobileInput.fill(validStudent.mobile);

    await form.submitButton.click();

    await expect(form.modalTitle).not.toBeVisible();
  });

  test('should block submit when Last Name is blank', async () => {
    await form.firstNameInput.fill(validStudent.firstName);
    await form.emailInput.fill(validStudent.email);
    await form.genderMale.click();
    await form.mobileInput.fill(validStudent.mobile);

    await form.submitButton.click();

    await expect(form.modalTitle).not.toBeVisible();
  });

  test('should block submit when Gender is blank', async () => {
    await form.firstNameInput.fill(validStudent.firstName);
    await form.lastNameInput.fill(validStudent.lastName);
    await form.emailInput.fill(validStudent.email);
    await form.mobileInput.fill(validStudent.mobile);

    await form.submitButton.click();

    await expect(form.modalTitle).not.toBeVisible();
  });

  test('should block submit when Mobile is blank', async () => {
    await form.firstNameInput.fill(validStudent.firstName);
    await form.lastNameInput.fill(validStudent.lastName);
    await form.emailInput.fill(validStudent.email);
    await form.genderMale.click();

    await form.submitButton.click();

    await expect(form.modalTitle).not.toBeVisible();
  });

  test('should block submit when only non-mandatory fields are filled', async ({ page }) => {
    const picturePath = '../fixtures/files/profile.png';
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

    await expect(form.modalTitle).not.toBeVisible();
  });
});
