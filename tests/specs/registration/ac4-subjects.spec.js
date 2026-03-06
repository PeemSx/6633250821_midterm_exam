import { test, expect } from '@playwright/test';
import { StudentRegistrationPage } from '../../pages/studentRegistrationPage.js';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('AC4: Subjects supports multiple removable tags', () => {
  let form;

  test.beforeEach(async ({ page }) => {
    form = new StudentRegistrationPage(page);
    await page.goto(FORM_URL);
  });

  test('should allow multiple subjects and remove a selected subject tag', async ({ page }) => {
    await form.subjectsInput.fill('Math');
    await page.getByRole('option', { name: 'Maths' }).click();
    await form.subjectsInput.fill('English');
    await page.getByRole('option', { name: 'English' }).click();

    const removeMathsButton = page.getByRole('button', { name: 'Remove Maths' });
    const removeEnglishButton = page.getByRole('button', { name: 'Remove English' });

    await expect(removeMathsButton).toBeVisible();
    await expect(removeEnglishButton).toBeVisible();

    await removeMathsButton.click();
    await expect(removeMathsButton).not.toBeVisible();
    await expect(removeEnglishButton).toBeVisible();
    await expect(form.subjectsInput).toBeVisible();
  });

  test('should keep remaining tags when removing one from three selected subjects', async ({
    page,
  }) => {
    await form.subjectsInput.fill('Math');
    await page.getByRole('option', { name: 'Maths' }).click();
    await form.subjectsInput.fill('English');
    await page.getByRole('option', { name: 'English' }).click();
    await form.subjectsInput.fill('Computer');
    await page.getByRole('option', { name: 'Computer Science' }).click();

    await page.getByRole('button', { name: 'Remove English' }).click();

    await expect(page.getByRole('button', { name: 'Remove Maths' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove English' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove Computer Science' })).toBeVisible();
  });

  test('should remove all subject tags', async ({ page }) => {
    await form.subjectsInput.fill('Math');
    await page.getByRole('option', { name: 'Maths' }).click();
    await form.subjectsInput.fill('English');
    await page.getByRole('option', { name: 'English' }).click();

    await page.getByRole('button', { name: 'Remove Maths' }).click();
    await page.getByRole('button', { name: 'Remove English' }).click();

    await expect(page.getByRole('button', { name: 'Remove Maths' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove English' })).not.toBeVisible();
    await expect(form.subjectsInput).toBeVisible();
  });

  test('should not create duplicate tag when selecting Maths twice', async ({ page }) => {
    await form.subjectsInput.fill('Math');
    await page.getByRole('option', { name: 'Maths' }).click();
    await form.subjectsInput.fill('Math');

    await expect(page.getByRole('option', { name: 'Maths' })).not.toBeVisible();

    await expect(
      page.locator('.subjects-auto-complete__multi-value').filter({ hasText: 'Maths' })
    ).toHaveCount(1);
  });
});
