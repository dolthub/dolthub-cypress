import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "@sharedTests/repoHeaderNav";
import { notBeVisible } from "@sharedTests/sharedFunctionsAndVariables";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const commonTests = [
    newExpectation(
      "should not find create pull button",
      "[data-cy=new-pull-button]",
      notExist,
    ),
    newExpectation(
      "should not find empty commits message",
      "[data-cy=commit-log-no-commits]",
      notExist,
    ),
    newExpectation(
      "should find commits list with at least 20 commits",
      "[data-cy=commit-log-commits-list] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 20),
    ),
    newExpectation(
      "should find first commit commit and user links",
      "[data-cy=commit-log-item]:first a",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should find first commit prof pic",
      "[data-cy=commit-log-item-prof-pic]:first",
      beVisible,
    ),
    newExpectation(
      "should find first commit date",
      "[data-cy=commit-log-item-date]:first",
      beVisible,
    ),
  ];

  const tests = [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      false,
      true,
      false,
      "commit-log",
    ),
    ...commonTests,
    newExpectation(
      "should find csv download icon",
      "[data-cy=dump-csv]",
      beVisible,
    ),
    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-id-desktop]:first",
      beVisible,
    ),
  ];

  const mobileTests = [
    ...testMobileRepoHeaderNav(currentOwner, currentRepo, "commit-log"),
    ...commonTests,
    newExpectation(
      "should not find csv download icon",
      "[data-cy=dump-csv]",
      notBeVisible,
    ),

    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-id-mobile]:first",
      beVisible,
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
