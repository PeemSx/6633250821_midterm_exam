import { expect } from '@playwright/test';
import path from 'path';

export async function fillName(page, firstName, lastName) {
  await page.locator('#firstName').fill(firstName);
  await page.locator('#lastName').fill(lastName);
}

export async function fillEmail(page, email) {
  await page.locator('#userEmail').fill(email);
}

export async function selectGender(page, gender = 'Male') {
  if (gender === 'Female') {
    await page.getByText('Female', { exact: true }).click();
    return;
  }
  if (gender === 'Other') {
    await page.getByText('Other', { exact: true }).click();
    return;
  }
  await page.getByText('Male', { exact: true }).click();
}

export async function fillMobile(page, mobile) {
  await page.locator('#userNumber').fill(mobile);
}

export async function fillDateOfBirth(page, dateText) {
  await page.locator('#dateOfBirthInput').fill(dateText);
  await page.locator('#dateOfBirthInput').press('Tab');
}

export async function fillSubject(page, subjectText) {
  await page.locator('#subjectsInput').fill(subjectText);
  await page.locator('.subjects-auto-complete__option').first().click();
}

export async function selectHobby(page, hobby = 'Sports') {
  const hobbyLocatorMap = {
    Sports: 'label[for="hobbies-checkbox-1"]',
    Reading: 'label[for="hobbies-checkbox-2"]',
    Music: 'label[for="hobbies-checkbox-3"]',
  };
  await page.locator(hobbyLocatorMap[hobby] ?? hobbyLocatorMap.Sports).click();
}

export async function fillCurrentAddress(page, address) {
  await page.locator('#currentAddress').fill(address);
}

export async function selectState(page, state) {
  await page.locator('#state').click();
  await page.getByText(state, { exact: true }).click();
}

export async function selectCity(page, city) {
  await page.locator('#city').click();
  await page.getByText(city, { exact: true }).click();
}

export async function uploadPicture(page, filePath) {
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), 'tests/specs', filePath);
  await page.locator('#uploadPicture').setInputFiles(resolvedPath);
}

export async function submitForm(page) {
  await page.locator('#submit').click();
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
