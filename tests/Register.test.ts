import { test, expect } from "@playwright/test";
import { UserActions } from "../src/action/UserActions";
import { getTestData } from "./fixtures/testData";

const registerTestData = getTestData("test-data/register.yaml");

if (!registerTestData || typeof registerTestData !== 'object' || !Array.isArray(registerTestData.tests)) {
  throw new Error("Invalid test data format: 'tests' key is missing or not an array");
}

registerTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    const userActions = new UserActions(page, request, testData.mode, testData.role);
    try {
      await userActions.performSignUp(testData.fullName, testData.email, testData.password, testData.phone, testData.mode, testData.role);
      await userActions.verifyRegisterSuccess(testData.role);
    }
    catch (error) {
      if (testData.mustFail && "errorMessages" in testData) {
        userActions.verifyErroMessages(testData.errorMessages);
        return;
      }
      throw error;
    }

  });
});

