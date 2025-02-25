import { test, expect } from "@playwright/test";
import { UserActions } from "../src/action/UserActions";
import { getTestData } from "./fixtures/testData";

const loginTestData = getTestData("test-data/profile.yaml");

if (!loginTestData || typeof loginTestData !== 'object' || !Array.isArray(loginTestData.tests)) {
  throw new Error("Invalid test data format: 'tests' key is missing or not an array");
}

loginTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const userActions = new UserActions(page, request, testData.mode, testData.role);
      await userActions.performLogin(testData.username, testData.password);
      await userActions.verifyLoginSuccess(testData.role);
      await userActions.performEditProfile(testData);
      await userActions.verifyEditProfile(testData);

    }
    catch (error) {
      if (testData.mustFail && "errorMessages" in testData && error.message.includes(testData.errorMessages)) {
        console.log('Test failed as expected:', error.message);
        return;
      }
      throw error;
    }

  });
});
