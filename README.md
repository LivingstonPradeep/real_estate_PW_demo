# Real Estate PW Demo

## Overview

Real Estate PW Demo is a **TypeScript-based Hybrid framework** designed to ensure the quality and functionality of the API and UI. It follows best practices for test automation, including the Page Object Model (POM) and data-driven testing, and provides robust test coverage for critical application workflows.

## Features

- **Hybrid Framework**: Supports both UI and API test execution.
- **Action Layer**: Implements an abstraction layer to improve test reusability and maintainability.
- **Data-Driven Testing**: Uses YAML files for flexible and structured test data management.
- **Test Execution and Reporting**:
  - Integrated with GitHub Actions for CI/CD execution.
  - Allure Reporting for enhanced test insights.
  - Screenshots captured for test validation and debugging.
- **Flexible Test Data Structure**: Allows for easy modifications to test data without altering test logic.

## Test Automation Best Practices

### Page Object Model (POM)

- Implements the Page Object Pattern to create an object repository for web UI elements.
- Each page has a corresponding class for improved modularity.
- Maintains a clear separation between test methods and page-specific code.
- Groups related elements and actions within relevant page objects for easier maintenance.
- **UI operations should be written as Page classes, while API actions should be written as their API class counterparts.** The Actions class will decide which operation to choose based on the mode specified in the test data.

### Data-Driven Testing

- Externalized test data is stored in YAML files for scalability and ease of maintenance.
- Tests are parameterized to run with multiple data sets.
- Maintains a clear separation between test data and test logic.
- Includes both positive and negative test scenarios to ensure robustness.
- Test data can be structured in any format as long as it is correctly handled in the test.

#### Example YAML Test Data File:
```yaml
tests:
- description: "UI-Login-User"
  username: "test@example.com"
  password: "Test123!"
  role: "user"
  mode: "ui"
  mustFail: false

- description: "UI-Register-Agent-Fail"
  fullName: "Harrison Ford"
  email: "patty@example.com"
  password: "Test"
  role: "agent"
  mode: "ui"
  phone: "1234"
  mustFail: true
  errorMessages: ["Please enter a valid phone number", "Password must be at least 8 characters"]
```

Negative test scenarios are expected to throw exceptions. The test execution will verify if the expected error messages are present in the application response.

#### Reading and Using Test Data in Tests:
```typescript
const propertyPageSearchTestData = propertiesTestData.tests.filter(obj => obj.description.includes("UI-Property-Page-Search"));

propertyPageSearchTestData.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      await usersAction.performTest();
    } catch (error) {
      console.error(error);
    }
  });
});
```

## Test Scenarios Implemented

- **User Management**:
  - User registration, login, and logout test cases.
  - Verification of user roles and permissions (Admin, Agent, User).
  - User profile management functionality.
- **Property Management**:
  - Property listing and search functionality.
  - Validation of property details and booking process.
- **User Experience**:
  - Verification of user notifications and alerts.

## Coverage Requirements

- Ensures a minimum **80% test coverage** for critical paths.
- Covers all user roles (Admin, Agent, User) to validate different access levels and permissions.

## Running Tests

### Prerequisites

- Node.js installed (latest LTS version recommended).
- Playwright installed via npm:
  ```sh
  npm install @playwright/test
  ```
- Dependencies installed via npm:
  ```sh
  npm install
  ```

### Configuring Test Execution

#### Grouping Tests

Use `test.describe()` to group related tests:
```typescript
test.describe("Smoke Tests", () => {
  test("Verify homepage loads", async ({ page }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      await usersAction.performTest();
    } catch (error) {
      console.error(error);
    }
  });
});
```

#### Using Tags to Categorize Tests

Run grouped tests using tags for different environments:
```sh
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
npx playwright test --grep "@critical"
```



Assign tags to tests for selective execution:
```typescript
test('critical priority test', { tags: ['@priority', '@critical'] }, async ({ page }) => {
    const usersAction = new UsersAction(page, request, testData.mode, testData.role);
    await usersAction.performTest();
});
```
Run tests based on tags:
```sh
npx playwright test --grep "@critical"
```

#### Running Tests in Multiple Browsers

Execute tests in all defined browsers:
```sh
npx playwright test --project=Realestate_Demo --project=Firefox
```

#### Increasing Workers

Modify `workers` in `playwright.config.ts` to increase parallel execution:
```typescript
workers: 4,
```
Or set dynamically during execution:
```sh
npx playwright test --workers=4
```

### Generating Reports

- Allure reports are generated automatically and can be viewed locally:
  ```sh
  npx allure serve allure-results
  ```

## Continuous Integration

- CI/CD pipelines execute tests on GitHub Actions.
- Test execution is dynamic based on environment variables.
- Run tests by tags in different environments using:
  ```sh
  npx playwright test --grep "@priority" --project=Realestate_Demo
  ```
- Reports are deployed and stored as artifacts for analysis.

## Contribution Guidelines

- Follow the Page Object Model for structuring UI tests.
- Keep test data separate from test scripts.
- Ensure new test cases contribute towards the required coverage threshold.
- Use meaningful test case names and assertions for clarity.
- Submit PRs with relevant test cases and ensure they pass before merging.

## Conclusion

This framework provides a scalable, maintainable, and flexible approach to test automation. By following best practices and leveraging Playwright’s capabilities, it ensures high-quality software delivery with efficient test execution and reporting mechanisms.