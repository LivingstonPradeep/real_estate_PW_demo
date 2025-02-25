import fs from "fs";
import yaml from "js-yaml";

// interface TestData {
//   description: string;
//   username: string;
//   password: string;
//   role: "user" | "admin" | "agent";
//   mode: "ui" | "api";
// }

// export function getTestData(file: string): TestData[] {
//   const fileContents = fs.readFileSync(file, "utf8");
//   const data = yaml.load(fileContents) as { tests: TestData[] };
//   return data.tests;
// }

export function getTestData(file: string){
  const testData =  yaml.load(fs.readFileSync(file, 'utf8'));

  if (!testData || typeof testData !== 'object' || !Array.isArray(testData.tests)) {
    throw new Error("Invalid test data format: 'tests' key is missing or not an array");
  }
  return testData;
}
