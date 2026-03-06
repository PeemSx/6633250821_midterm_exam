export class StudentRegistrationPage {
  constructor(page) {
    this.page = page;

    // Text inputs
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.currentAddressInput = page.locator('#currentAddress');

    // Gender
    this.genderMale = page.getByText('Male', { exact: true });
    this.genderFemale = page.getByText('Female', { exact: true });
    this.genderOther = page.getByText('Other', { exact: true });

    // Date of birth
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.dateOfBirthYearSelect = page.locator('.react-datepicker__year-select');
    this.dateOfBirthMonthSelect = page.locator('.react-datepicker__month-select');

    // Subjects
    this.subjectsInput = page.locator('#subjectsInput');

    // Hobbies
    this.hobbySports = page.locator('label[for="hobbies-checkbox-1"]');
    this.hobbyReading = page.locator('label[for="hobbies-checkbox-2"]');
    this.hobbyMusic = page.locator('label[for="hobbies-checkbox-3"]');

    // File upload
    this.uploadPictureInput = page.locator('#uploadPicture');

    // State / City
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');

    // Form actions
    this.submitButton = page.locator('#submit');

    // Result modal
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.closeModalButton = page.locator('.modal.show').getByRole('button', { name: 'Close' });
    this.resultTableRows = page.locator('.table-responsive tr');
  }

  dateOfBirthDay(day) {
    return this.page
      .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
      .filter({ hasText: String(day) })
      .first();
  }
}
