import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  testDeployHosted,
  testDeploySelfHosted,
} from "../../../../utils/sharedTests/testDeployTab";

const pageName = "Deploy page for database";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...testDeployHosted,
    newExpectation(
      "should find Create Deployment button",
      "[data-cy=hosted-create-deployment-button]",
      beVisible,
    ),
    ...testDeploySelfHosted,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
