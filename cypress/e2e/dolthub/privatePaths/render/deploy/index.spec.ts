import {
  testDeployHosted,
  testDeploySelfHosted,
} from "@sharedTests/testDeployTab";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { testOldFormatPopup } from "@utils/sharedTests/repoHeaderNav";

const pageName = "Deploy page for database";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const tests = [
    testOldFormatPopup,
    ...testDeployHosted,
    ...testDeploySelfHosted,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
