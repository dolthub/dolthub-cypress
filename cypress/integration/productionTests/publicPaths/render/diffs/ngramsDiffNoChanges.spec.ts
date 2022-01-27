import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with no changes";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "ghqbc0vpjpsl4065rvbgmcgrddh1e69r";
const currentToCommit = "ghqbc0vpjpsl4065rvbgmcgrddh1e69r";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}..${currentToCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show commit diff breadcrumbs",
      "[data-cy=repo-commit-diff-breadcrumbs]",
      beVisible,
    ),
    newExpectation(
      "should show back to commit log button",
      "[data-cy=back-to-commits]",
      beVisible,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
      true,
    ),
    newExpectation(
      "should not have viewing message",
      "[data-cy=viewing-message]",
      notExist,
      true,
    ),
    newExpectation(
      "should show two form selects",
      "[data-cy=form-select]",
      newShouldArgs("be.visible.and.have.length", 2),
      true,
    ),
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
