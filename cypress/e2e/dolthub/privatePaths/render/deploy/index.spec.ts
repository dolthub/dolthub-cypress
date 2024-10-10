import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  testDeployHosted,
  testDeploySelfHosted,
} from "@utils/sharedTests/deployTab";

const pageName = "Deploy page for database";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const tests = [...testDeployHosted, ...testDeploySelfHosted];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
