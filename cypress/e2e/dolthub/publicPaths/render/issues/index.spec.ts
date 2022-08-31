import { changeBranch } from "cypress/e2e/utils/sharedTests/changeBranch";
import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import { Tests } from "../../../../utils/types";

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
    currentTabID: "issue-table",
    destinationBranch,
    destinationURL: `/${currentPage}${destinationBranch}`,
  };

  const desktopAndIpadTests = (isIpad = false): Tests => [
    ...changeBranch(changeBranchParams),
    newExpectation(
      "should not find empty issue message",
      "[data-cy=issue-no-issues]",
      notExist,
    ),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
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
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), false, loggedIn),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    /* 
    TODO: mobile issue page test
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, true, true),
    ), 
    */
  ];
  const skip = false;
  runTestsForDevices({
    currentPage: `${currentPage}${currentBranch}`,
    devices,
    skip,
  });
});
