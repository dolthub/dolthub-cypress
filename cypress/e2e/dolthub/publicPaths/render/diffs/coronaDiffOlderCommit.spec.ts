import { diffsWithCommitTests } from "@sharedTests/diffs";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Diff page with commits not visible in selectors";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentFromCommit = "19gaf82fja8i7og98rrj3dckkeddo9bu";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...diffsWithCommitTests(currentFromCommit, 1),
    newExpectation(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", "cases"),
    ),
    newExpectation(
      "should show diff table list summaries",
      "[data-cy=diff-table-list-summaries] > li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should show table diff summary",
      "[data-cy=diff-table-stats]",
      beVisible,
    ),
    newExpectation(
      "should show diff table",
      "[data-cy=data-diff-cases]",
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      "[data-cy=data-diff-cases] > tbody > tr",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
