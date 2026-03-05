# Midterm - Playwright Automated Tests

This project automates testing for:
- `https://demoqa.com/automation-practice-form`

Testing technique used:
- **Equivalence Partitioning (EP)**
- Data is split into valid/invalid/boundary classes and mapped into test fixtures.

## Project Structure

```text
tests/
  fixtures/
    files/profile.png
    studentFormData.js
  pages/
    studentRegistrationPage.js
  student-registration-form.spec.js
```

## Design Principles Applied

- Clear `Arrange - Act - Assert` in every test.
- One test focuses on one main behavior.
- Test data separated from test logic (`fixtures`).
- Reduced duplication via locator-focused page object and shared fixtures.
- Test names follow `Given - When - Then`.

## Covered Behaviors

- Valid complete submission -> success modal + summary check.
- Missing required fields -> submission blocked.
- Invalid email classes -> submission blocked.
- Mobile boundary invalid (9 digits) -> blocked.
- Mobile boundary valid (10 digits) -> accepted.

## Run

```bash
npm run test:e2e
```

Open HTML report:

```bash
npm run report
```

## If Requirements Change (e.g., new field)

1. Add new test data class in `tests/fixtures/studentFormData.js`.
2. Add interaction method in `tests/pages/studentRegistrationPage.js`.
3. Add focused behavior test in `tests/student-registration-form.spec.js`.
