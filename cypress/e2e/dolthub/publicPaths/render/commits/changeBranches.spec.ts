import { changeBranch } from "../../../../utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/`;

describe(`${pageName} renders expected components on different devices`, () => {
  const changeBranchParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "commit-log-commits-list",
    destinationBranch: "archived",
    destinationURL: `/${currentPage}archived`,
  };

  const devices = [
    macbook15ForAppLayout(pageName, changeBranch(changeBranchParams)),
  ];
  const skip = false;
  runTestsForDevices({
    currentPage: `${currentPage}${currentBranch}`,
    devices,
    skip,
  });
});
