// tests/specs/registration-form.spec.js
import path from 'path';
import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../pages/studentRegistrationPage.js';
import {
  validStudent,
  validSummaryCases,
  stateCityCases,
  validEmailCases,
} from '../fixtures/inputData.js';
import {
  summaryCheck,
  fillCurrentAddress,
  fillDateOfBirth,
  fillEmail,
  fillMobile,
  fillName,
  fillSubject,
  selectCity,
  selectGender,
  selectHobby,
  selectState,
  uploadPicture,
} from '../utils/form.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';
test.describe('Student Registration Form', () => {
  test.describe('AC1: User can submit with valid data', () => {
    test('should show success modal after submit all fields', async ({ page }) => {
      const form = new StudentRegistrationPage(page);
      const picturePath = '../fixtures/files/profile.png';

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);
      await fillDateOfBirth(page, validStudent.dateOfBirth);
      await fillSubject(page, validStudent.subject);
      await selectHobby(page, validStudent.hobbies[0]);
      await selectHobby(page, validStudent.hobbies[1]);
      await uploadPicture(page, picturePath);
      await fillCurrentAddress(page, validStudent.currentAddress);
      await selectState(page, validStudent.state);
      await selectCity(page, validStudent.city);

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
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when Last Name is blank', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await form.firstNameInput.fill(validStudent.firstName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when Gender is blank', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when Mobile is blank', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when only non-mandatory fields are filled', async ({ page }) => {
      const form = new StudentRegistrationPage(page);
      const picturePath = '../fixtures/files/profile.png';

      await page.goto(FORM_URL);
      await fillDateOfBirth(page, validStudent.dateOfBirth);
      await fillSubject(page, validStudent.subject);
      await selectHobby(page, validStudent.hobbies[0]);
      await selectHobby(page, validStudent.hobbies[1]);
      await uploadPicture(page, picturePath);
      await fillCurrentAddress(page, validStudent.currentAddress);
      await selectState(page, validStudent.state);
      await selectCity(page, validStudent.city);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC3: City options depend on selected State', () => {
    for (const caseData of stateCityCases) {
      test(`should show only ${caseData.state} cities (sampled)`, async ({ page }) => {
        const form = new StudentRegistrationPage(page);

        await page.goto(FORM_URL);
        await selectState(page, caseData.state);
        await form.cityDropdown.click();

        for (const city of caseData.expectedCities) {
          await expect(page.getByText(city, { exact: true })).toBeVisible();
        }
        await expect(page.getByText(caseData.unexpectedCity, { exact: true })).toHaveCount(0);
      });
    }
  });

  test.describe('AC4: Subjects supports multiple removable tags', () => {
    test('should allow multiple subjects and remove a selected subject tag', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);

      await form.subjectsInput.fill('Math');
      await page.getByRole('option', { name: 'Maths' }).click();
      await form.subjectsInput.fill('English');
      await page.getByRole('option', { name: 'English' }).click();

      const removeMathsButton = page.getByRole('button', { name: 'Remove Maths' });
      const removeEnglishButton = page.getByRole('button', { name: 'Remove English' });

      await expect(removeMathsButton).toBeVisible();
      await expect(removeEnglishButton).toBeVisible();

      await removeMathsButton.click();
      await expect(removeMathsButton).toHaveCount(0);
      await expect(removeEnglishButton).toBeVisible();
      await expect(form.subjectsInput).toBeVisible();
    });

    test('should keep remaining tags when removing one from three selected subjects', async ({
      page,
    }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);

      await form.subjectsInput.fill('Math');
      await page.getByRole('option', { name: 'Maths' }).click();
      await form.subjectsInput.fill('English');
      await page.getByRole('option', { name: 'English' }).click();
      await form.subjectsInput.fill('Computer');
      await page.getByRole('option', { name: 'Computer Science' }).click();

      await page.getByRole('button', { name: 'Remove English' }).click();

      await expect(page.getByRole('button', { name: 'Remove Maths' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Remove English' })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Remove Computer Science' })).toBeVisible();
    });

    test('should remove all subject tags', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);

      await form.subjectsInput.fill('Math');
      await page.getByRole('option', { name: 'Maths' }).click();
      await form.subjectsInput.fill('English');
      await page.getByRole('option', { name: 'English' }).click();

      await page.getByRole('button', { name: 'Remove Maths' }).click();
      await page.getByRole('button', { name: 'Remove English' }).click();

      await expect(page.getByRole('button', { name: 'Remove Maths' })).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Remove English' })).toHaveCount(0);
      await expect(form.subjectsInput).toBeVisible();
    });
  });

  test.describe('AC5: Submission modal shows exact entered data', () => {
    for (const caseData of validSummaryCases) {
      test(`should show exact summary for ${caseData.firstName} (${caseData.state})`, async ({
        page,
      }) => {
        const form = new StudentRegistrationPage(page);

        await page.goto(FORM_URL);
        await fillName(page, caseData.firstName, caseData.lastName);
        await fillEmail(page, caseData.email);
        await selectGender(page, caseData.gender);
        await fillMobile(page, caseData.mobile);
        await selectState(page, caseData.state);
        await selectCity(page, caseData.city);

        await form.submitButton.click();

        await summaryCheck(form, caseData);
      });
    }
  });

  test.describe('AC6.1: Mobile must be exactly 10 digits', () => {
    test('should submit successfully when mobile has exactly 10 digits', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, '0999999999');

      await form.submitButton.click();

      await expect(form.modalTitle).toBeVisible();
    });

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

    test('should keep only first 10 digits when mobile input has 11 digits', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, '08123456789');

      await expect(form.mobileInput).toHaveValue('0812345678');
      await form.submitButton.click();
      await expect(form.modalTitle).toBeVisible();
    });

    test('should block submit when mobile contains alphabetic characters', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, '08123abcd9');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when mobile contains special symbols', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, '08123@#*89');

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.2: Email must contain @ and valid domain', () => {
    for (const validEmail of validEmailCases) {
      test(`should submit successfully when email is valid: ${validEmail}`, async ({ page }) => {
        const form = new StudentRegistrationPage(page);

        await page.goto(FORM_URL);
        await fillName(page, validStudent.firstName, validStudent.lastName);
        await fillEmail(page, validEmail);
        await selectGender(page, validStudent.gender);
        await fillMobile(page, validStudent.mobile);

        await form.submitButton.click();

        await expect(form.modalTitle).toBeVisible();
      });
    }

    test('should block submit when email does not contain @', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, 'supanat.example.com');
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });

    test('should block submit when email has incomplete domain', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, 'supanat@');
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await form.submitButton.click();

      await expect(form.modalTitle).not.toBeVisible();
    });
  });

  test.describe('AC6.3: Date of Birth default and manual calendar selection', () => {
    test('should default DOB to current system date', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      const defaultDobValue = await form.dateOfBirthInput.inputValue();
      const isToday = await page.evaluate((dateText) => {
        const selected = new Date(dateText);
        const today = new Date();
        return (
          selected.getDate() === today.getDate() &&
          selected.getMonth() === today.getMonth() &&
          selected.getFullYear() === today.getFullYear()
        );
      }, defaultDobValue);

      expect(isToday).toBeTruthy();
    });

    test('should allow selecting DOB manually via calendar widget', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await form.dateOfBirthInput.click();
      await page.locator('.react-datepicker__year-select').selectOption('2019');
      await page.locator('.react-datepicker__month-select').selectOption('1');
      await page
        .locator('.react-datepicker__day--012:not(.react-datepicker__day--outside-month)')
        .click();

      await expect(form.dateOfBirthInput).toHaveValue('12 Feb 2019');
    });
  });

  test.describe('AC7: Dynamic dropdown behavior', () => {
    test('should keep city dropdown empty until state is selected', async ({ page }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await expect(form.cityDropdown).toContainText('Select City');
      await expect(form.cityDropdown).not.toContainText('Delhi');
      await expect(form.cityDropdown).not.toContainText('Lucknow');
    });

    test('should reset city after state change and block submit with stale city', async ({
      page,
    }) => {
      const form = new StudentRegistrationPage(page);

      await page.goto(FORM_URL);
      await fillName(page, validStudent.firstName, validStudent.lastName);
      await fillEmail(page, validStudent.email);
      await selectGender(page, validStudent.gender);
      await fillMobile(page, validStudent.mobile);

      await selectState(page, 'NCR');
      await selectCity(page, 'Delhi');
      await selectState(page, 'Uttar Pradesh');

      await expect(form.cityDropdown).toContainText('Select City');
      await form.submitButton.click();
      await expect(form.modalTitle).not.toBeVisible();
    });
  });
});
