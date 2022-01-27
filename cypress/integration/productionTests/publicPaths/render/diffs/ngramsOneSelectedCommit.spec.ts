import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { diffsWithCommitTests } from "../../../../utils/sharedTests/diffs";

const pageName = "Diff page with one selected commit";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "q2l59dla1vak1fp0gp2me451bq9sli2k";
const branch = "master";
const tableName = "unigram_counts";
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
      newShouldArgs("be.visible.and.have.length", 3),
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
      newShouldArgs("be.visible.and.have.length.of.at.least", 50),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
