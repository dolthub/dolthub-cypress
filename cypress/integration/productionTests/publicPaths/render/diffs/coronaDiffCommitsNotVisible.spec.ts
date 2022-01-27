import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with commits not visible in selectors";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentFromCommit = "ipqhluv35od2ld6t00k88mgd22mtsnmh";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

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
      "should have viewing message",
      "[data-cy=viewing-message]",
      newShouldArgs("be.visible.and.contain", currentFromCommit),
      true,
    ),
    newExpectation(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", "case_details"),
    ),
    newExpectation(
      "should show View SQL link",
      "[data-cy=view-sql-link]",
      beVisible,
    ),
    newExpectation(
      "should show filter by diff type selector",
      "[data-cy=filter-by-diff-type]",
      beVisible,
    ),
    newExpectation(
      "should show commit diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
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
      "[data-cy=data-diff-case_details]",
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      "[data-cy=data-diff-case_details] > tbody > tr",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
