import { test, expect } from "@playwright/test";
import { UserActions } from "../src/action/UserActions";
import { getTestData } from "./fixtures/testData";

const logoutTestData = getTestData("test-data/logout.yaml");

if (!logoutTestData || typeof logoutTestData !== 'object' || !Array.isArray(logoutTestData.tests)) {
  throw new Error("Invalid test data format: 'tests' key is missing or not an array");
}

logoutTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const userActions = new UserActions(page, request, testData.mode, testData.role);
      await userActions.performLogin(testData.username, testData.password);
      await userActions.verifyLoginSuccess(testData.role);
      await userActions.performLogout();
    }
    catch (error) {
      if (testData.mustFail && "errorMessage" in testData && error.message.includes(testData.errorMessage)) {
        console.log('Test failed as expected:', error.message);
        return;
      }
      throw error;
    }

  });
});
