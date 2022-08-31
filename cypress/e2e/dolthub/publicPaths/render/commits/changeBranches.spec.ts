import { changeBranch } from "../../../../utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_branch_protection";
const currentBranch = "branch_can_not_be_deleted";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/`;

describe(`${pageName} renders expected components on different devices`, () => {
  const changeBranchParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "commit-log-commits-list",
    destinationBranch: "main",
    destinationURL: `/${currentPage}main`,
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
