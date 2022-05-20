import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import {
  testDeploySelfHosted,
  testDeployHosted,
} from "../../../../../utils/sharedTests/testDeployTab";

const pageName = "Deploy page for empty database";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    ...testDeployHosted,
    newExpectation(
      "should not find Create Deployment button",
      "[data-cy=hosted-create-deployment-button]",
      notExist,
    ),
    ...testDeploySelfHosted,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
