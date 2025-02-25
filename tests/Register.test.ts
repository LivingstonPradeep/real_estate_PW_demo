import { test, expect } from "@playwright/test";
import { UsersAction } from "../src/action/UsersAction";
import { getTestData } from "./fixtures/testData";

const registerTestData = getTestData("test-data/register.yaml");

registerTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    const userActions = new UsersAction(page, request, testData.mode, testData.role);
    try {
      await userActions.performSignUp(testData.fullName, testData.email, testData.password, testData.phone, testData.mode, testData.role);
      await userActions.verifyRegisterSuccess(testData.role);
    }
    catch (error) {
      if (testData.mustFail && "errorMessages" in testData) {
        userActions.verifyRegisterErrorMessages(testData.errorMessages);
        return;
      }
      throw error;
    }

  });
});

