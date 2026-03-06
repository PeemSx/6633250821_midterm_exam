import { expect } from '@playwright/test';

function resultValue(form, label) {
  return form.resultTableRows.filter({ hasText: label }).locator('td').nth(1);
}

export async function summaryCheck(
  form,
  { firstName, lastName, email, gender, mobile, state, city }
) {
  await expect(form.modalTitle).toHaveText('Thanks for submitting the form');
  await expect(resultValue(form, 'Student Name')).toHaveText(
    `${firstName} ${lastName}`
  );
  await expect(resultValue(form, 'Student Email')).toHaveText(email);
  await expect(resultValue(form, 'Gender')).toHaveText(gender);
  await expect(resultValue(form, 'Mobile')).toHaveText(mobile);
  await expect(resultValue(form, 'State and City')).toHaveText(`${state} ${city}`);
  await expect(form.closeModalButton).toBeVisible();
}
