import { UsersAction } from "../src/action/UsersAction";
import { getTestData } from "../utilities/testData";
import { test } from "./fixtures/test-setup";

const loginTestData = getTestData("test-data/profile.yaml");

loginTestData.tests.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const userActions = new UsersAction(page, request, testData.mode, testData.role);
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
