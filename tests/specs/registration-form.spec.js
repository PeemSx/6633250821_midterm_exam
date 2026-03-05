// tests/specs/registration-form.spec.js
import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../pages/studentRegistrationPage.js';
import { validStudent } from '../fixtures/inputData.js';
import {
  fillEmail,
  fillMobile,
  fillName,
  selectGender,
} from '../utils/form.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('Student Registration Form', () => {
  test.describe('AC1: User can submit with valid data', () => {
    test('should show success modal after submit all fields', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).toBeVisible();
    });
    test('should show success modal after submit only mandatory fields', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).toBeVisible();
    });
  });

  test.describe('AC2: Mandatory fields cannot be blank', () => {
    test('should block submit when First Name is blank', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await form.lastNameInput.fill(validStudent.lastName);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.1: Mobile must be exactly 10 digits', () => {
    test('should block submit when mobile has 9 digits', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      // Arrange
      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, '081234567');

      // Act
      await form.submitButton.click();

      // Assert
      await expect(form.modalTitle).not.toBeVisible();
    });
  });
});
