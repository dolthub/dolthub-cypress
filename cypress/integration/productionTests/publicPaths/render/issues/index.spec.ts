import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import { mobileTests } from "../../../../utils/sharedTests/testRepoPageMobile";
import { Tests } from "../../../../utils/types";

const pageName = "Issues page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisibleAndContain = (value: string) =>
    newShouldArgs("be.visible.and.contain", value);
  const notExist = newShouldArgs("not.exist");

  const desktopAndIpadTests = (isIpad = false): Tests => [
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
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, hasDocs, true),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
