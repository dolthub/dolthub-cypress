import { changeBranch } from "@sharedTests/changeBranch";
import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { mobileTests } from "@utils/sharedTests/repoPageMobile";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Tests } from "@utils/types";

const pageName = "Issues page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "archived";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues?refName=`;
const destinationBranch = "master";
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisibleAndContain = (value: string) =>
    newShouldArgs("be.visible.and.contain", value);
  const notExist = newShouldArgs("not.exist");
  const changeBranchParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "issue-table",
    destinationBranch,
    destinationURL: `/${currentPage}${destinationBranch}`,
  };

  const tests: Tests = [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      true,
      "issues",
    ),
    ...changeBranch(changeBranchParams),
    newExpectation(
      "should not find empty issue message",
      "[data-cy=issue-no-issues]",
      notExist,
    ),
    newExpectation(
      "should have issue search input",
      "[data-cy=issue-search-input]",
      beVisible,
    ),
    newExpectation(
      "should find issue table with header",
      "[data-cy=issue-table] > thead > tr > th",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find at least 2 issues",
      "[data-cy=issue-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 2),
    ),
    newExpectation(
      "should find issue with ID 8 with 5 columns",
      "[data-cy=issue-row-8] > td",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find issue with ID 8 with two links",
      "[data-cy=issue-row-8] > td a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should find issue with ID 8 with issue state label",
      "[data-cy=issue-row-8] [data-cy=issue-state-label]",
      beVisibleAndContain("Closed"),
    ),
    // ...testNewIssueButton(loggedIn),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2ForAppLayout(pageName, tests),

    // TODO: mobile issue page tests
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
        "issues",
      ),
    ),
  ];
  const skip = false;
  runTestsForDevices({
    currentPage: `${currentPage}${currentBranch}`,
    devices,
    skip,
  });
});
