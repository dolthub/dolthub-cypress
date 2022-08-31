import { changeBranch } from "../../../../utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";

const pageName = "Pull requests page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls`;
const destinationBranch = "archived";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");
  const changeBranchParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "create-pull-request-button",
    destinationBranch,
    destinationURL: `/${currentPage}?refName=${destinationBranch}`,
  };

  const desktopAndIpadTests = (isIpad = false) => [
    ...changeBranch(changeBranchParams),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, true, isIpad),
    newExpectation(
      "should not find empty pull message",
      "[data-cy=pull-requests-no-pulls]",
      notExist,
    ),
    newExpectation(
      "should have pull search input",
      "[data-cy=pull-search-input]",
      beVisible,
    ),
    newExpectation(
      "should find pull requests table with header",
      "[data-cy=pull-requests-table] > thead > tr > th",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find at least 5 pulls",
      "[data-cy=pull-requests-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
    ),
    newExpectation(
      "should find pull with ID 1 with 5 columns",
      "[data-cy=pull-requests-row-1] > td",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find pull with ID 1 with two links",
      "[data-cy=pull-requests-row-1] > td a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should find pull with ID 1 with pull state label",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-label]",
      beVisible,
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), false),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    /* 
    TODO: mobile pull request page test
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, true, true),
    ), 
    */
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
