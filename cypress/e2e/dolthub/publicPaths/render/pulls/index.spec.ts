import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { changeBranch } from "@utils/sharedTests/changeBranch";
import { mobileTests } from "@utils/sharedTests/repoPageMobile";

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

  const tests = [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      false,
      true,
      true,
      "pull-requests",
    ),
    ...changeBranch(changeBranchParams),
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
      "should find at least 5 pulls",
      "[data-cy=pull-requests-table] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
    ),
    newExpectation(
      "should find pull with ID 5 with pull state icon",
      "[data-cy=pull-requests-row-5] [data-cy=pull-state-icon]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 5 with pull title",
      "[data-cy=pull-requests-row-5] [data-cy=pull-title]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 5 with pull id",
      "[data-cy=pull-requests-row-5] [data-cy=pull-id]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 5 with pull creator",
      "[data-cy=pull-requests-row-5] [data-cy=pull-creator]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 5 with created time",
      "[data-cy=pull-requests-row-5] [data-cy=created-time]",
      beVisible,
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests, false),
    iPad2ForAppLayout(pageName, tests),

    // TODO: mobile pull request page tests
    iPhoneXForAppLayout(
      pageName,
      mobileTests(
        currentOwner,
        currentRepo,
        currentPage,
        true,
        true,
        true,
        false,
        "pull-requests",
      ),
    ),
  ];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
