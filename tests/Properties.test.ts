import { UsersAction } from "../src/action/UsersAction";
import { PropertiesAction } from "../src/action/PropertiesAction";
import { getTestData } from "../utilities/testData";
import { test } from "./fixtures/test-setup";

const propertiesTestData = getTestData("test-data/search.yaml");

const propertyPageSearchTestData = propertiesTestData.tests.filter(obj => obj.description.includes("UI-Property-Page-Search"));
propertyPageSearchTestData.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      const propertiesAction = new PropertiesAction(page, request, testData.mode, testData.role);
      await usersAction.performLogin(testData.username, testData.password);
      await usersAction.verifyLoginSuccess(testData.role);
      await propertiesAction.searchInProperties(testData);
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

const homePageSearchTestData = propertiesTestData.tests.filter(obj => obj.description.includes("UI-Home-Page-Search"));
homePageSearchTestData.forEach((testData) => {
  test(testData.description, async ({ page, request }) => {
    try {
      const usersAction = new UsersAction(page, request, testData.mode, testData.role);
      const propertiesAction = new PropertiesAction(page, request, testData.mode, testData.role);
      await usersAction.performLogin(testData.username, testData.password);
      await usersAction.verifyLoginSuccess(testData.role);
      await propertiesAction.searchInHome(testData);
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

