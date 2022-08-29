import { changeBranch } from "cypress/e2e/utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  testDeployHosted,
  testDeploySelfHosted,
} from "../../../../utils/sharedTests/testDeployTab";

const pageName = "Deploy page for unsigned in User";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;

describe(`${pageName} expected components on different devices`, () => {
  const changeParams = {
    openMenu: true,
    branchCheckID: "hosted-button",
    newBranch: "archived",
  };

  const tests = [
    ...changeBranch(changeParams),
    ...testDeployHosted,
    ...testDeploySelfHosted,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
