export async function openRegistrationForm(page) {
  await page.goto('/automation-practice-form');
}

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
