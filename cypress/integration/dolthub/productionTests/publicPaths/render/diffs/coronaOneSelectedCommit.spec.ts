import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";
import { diffsWithCommitTests } from "../../../../../utils/sharedTests/diffs";

const pageName = "Diff page with one selected commit";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentFromCommit = "ebdftm98jrf5rts2ir21jtaoui5rrq3h";
const branch = "master";
const tableName = "case_details";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}?tableName=${tableName}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    ...diffsWithCommitTests(currentFromCommit, 1),
    newExpectation(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", tableName),
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
      `[data-cy=data-diff-${tableName}]`,
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      `[data-cy=data-diff-${tableName}] > tbody > tr`,
      newShouldArgs("be.visible.and.have.length.of.at.least", 20),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
