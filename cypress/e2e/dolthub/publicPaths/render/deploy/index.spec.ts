import { changeBranch } from "@sharedTests/changeBranch";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  testDeployHosted,
  testDeploySelfHosted,
} from "@utils/sharedTests/deployTab";

const pageName = "Deploy page for unsigned in User";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const destinationBranch = "archived";

describe(`${pageName} expected components on different devices`, () => {
  const changeParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "hosted-button",
    destinationBranch,
    destinationURL: `/${currentPage}?refName=${destinationBranch}`,
  };

  const tests = [
    ...testDeployHosted,
    ...testDeploySelfHosted,
    ...changeBranch(changeParams),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
