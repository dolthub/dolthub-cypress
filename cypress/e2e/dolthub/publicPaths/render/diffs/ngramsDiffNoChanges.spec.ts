import { leftNavDiffRangeTests } from "@sharedTests/diffs";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Diff page with no changes";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "8oms248ui0j9k1tdiohgp3bn1bs3eshs";
const currentToCommit = "8oms248ui0j9k1tdiohgp3bn1bs3eshs";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}..${currentToCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    ...leftNavDiffRangeTests(currentFromCommit, currentToCommit),
    newExpectation(
      "should show commit diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
    ),
    newExpectation(
      "should not show diff table list summaries",
      "[data-cy=diff-table-list-summaries]",
      notExist,
    ),
    newExpectation(
      "should not show table diff summary",
      "[data-cy=diff-table-stats]",
      notExist,
    ),
    newExpectation(
      "should not show diff table name",
      "[data-cy=diff-table-name]",
      notExist,
    ),
    newExpectation(
      "should show no tables changed message",
      "[data-cy=diff-table-list-summary-no-changes]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
