import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';
import { validStudent } from '../../fixtures/inputData.js';
import { dateOfBirthDay, fillMandatory } from '../../utils/form.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC6: Field validation', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  test.describe('AC6.1: Mobile must be exactly 10 digits', () => {
    test('should submit successfully when mobile has exactly 10 digits', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('0999999999');

      await form.submitButton.click();

      await expect(form.modalTitle).toBeVisible();
    });

    test('should block submit when mobile has 9 digits', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('081234567');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should keep only first 10 digits when mobile input has 11 digits', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('08123456789');

      await expect(form.mobileInput).toHaveValue('0812345678');
      await form.submitButton.click();
      await expect(form.modalTitle).toBeVisible();
    });

    test('should block submit when mobile contains alphabetic characters', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('08123abcd9');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when mobile contains special symbols', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('08123@#*89');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when mobile contains space characters', async () => {
      await fillMandatory(form, validStudent);
      await form.mobileInput.fill('08123 45678');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.2: Email must contain @ and valid domain', () => {
    test('should submit successfully when email is valid', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat.kampapan@example.com',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).toBeVisible();
    });

    test('should block submit when email does not contain @', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat.example.com',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when email has incomplete domain', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat@.com',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when email has no top-level domain', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat@domain',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when email has double @', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat@@example.com',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when email contains space character', async () => {
      await fillMandatory(form, {
        ...validStudent,
        email: 'supanat @example.com',
      });
      await form.mobileInput.fill(validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.3: Date of Birth default and manual calendar selection', () => {
    test('should default DOB to current system date', async () => {
      const defaultDobValue = await form.dateOfBirthInput.inputValue();
      const today = new Date();
      const day = today.toLocaleString('en-US', { day: '2-digit' });
      const month = today.toLocaleString('en-US', { month: 'short' });
      const year = today.getFullYear();
      const expectedDob = `${day} ${month} ${year}`;

      expect(defaultDobValue).toBe(expectedDob);
    });

    test('should allow selecting DOB manually via calendar widget', async ({ page }) => {
      await form.dateOfBirthInput.click();
      await form.dateOfBirthYearSelect.selectOption('2019');
      await form.dateOfBirthMonthSelect.selectOption('1');
      await dateOfBirthDay(page, 12).click();

      await expect(form.dateOfBirthInput).toHaveValue('12 Feb 2019');
    });

    test('should block submit when DOB is a future date', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const day = tomorrow.toLocaleString('en-US', { day: '2-digit' });
      const month = tomorrow.toLocaleString('en-US', { month: 'short' });
      const year = tomorrow.getFullYear();
      const futureDob = `${day} ${month} ${year}`;

      await fillMandatory(form, validStudent);
      await form.mobileInput.fill(validStudent.mobile);
      await form.dateOfBirthInput.fill(futureDob);
      await form.dateOfBirthInput.press('Enter');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.4: Picture must be image file only', () => {
    test('should block submit when uploading non-image file', async () => {
      const invalidFilePath = '../fixtures/files/invalid-file.txt';

      await fillMandatory(form, validStudent);
      await form.mobileInput.fill(validStudent.mobile);
      await form.uploadPictureInput.setInputFiles(invalidFilePath);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });
});
