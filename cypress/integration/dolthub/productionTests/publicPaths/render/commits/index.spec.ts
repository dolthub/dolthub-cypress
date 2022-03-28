import { runTestsForDevices } from "../../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../../utils/sharedTests/repoHeaderNav";
import { mobileTests } from "../../../../../utils/sharedTests/testRepoPageMobile";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/${currentBranch}`;
const hasDocs = true;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const desktopAndIpadTests = (isIpad = false) => [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, true, isIpad),
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
      newShouldArgs("be.visible.and.have.length", 4),
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
    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-item-commit-id]:first",
      beVisible,
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, hasDocs, hasBranch),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
