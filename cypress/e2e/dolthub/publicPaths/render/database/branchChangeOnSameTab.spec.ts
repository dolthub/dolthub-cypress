import { changeBranch } from "cypress/e2e/utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const testParams = {
    openMenu: false,
    branchCheckID: "description",
    newBranch: "archived",
  };

  const devices = [macbook15ForAppLayout(pageName, changeBranch(testParams))];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
