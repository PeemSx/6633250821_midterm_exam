import { expect } from '@playwright/test';

export function dateOfBirthDay(page, day) {
  return page
    .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
    .filter({ hasText: String(day) })
    .first();
}

export async function fillMandatory(form, data) {
  await form.firstNameInput.fill(data.firstName);
  await form.lastNameInput.fill(data.lastName);
  await form.emailInput.fill(data.email);

  if (data.gender === 'Female') {
    await form.genderFemale.click();
    return;
  }
  if (data.gender === 'Other') {
    await form.genderOther.click();
    return;
  }
  await form.genderMale.click();
}

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
