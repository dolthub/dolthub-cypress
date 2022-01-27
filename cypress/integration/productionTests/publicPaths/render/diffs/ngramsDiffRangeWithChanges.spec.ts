import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with changes";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "jbkpie6f9bujj2l9if3panmmhunu8cgp";
const currentToCommit = "q2l59dla1vak1fp0gp2me451bq9sli2k";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}..${currentToCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show back to commit log button",
      "[data-cy=back-to-commits]",
      beVisible,
    ),
    newExpectation(
      "should show commit diff breadcrumbs",
      "[data-cy=repo-commit-diff-breadcrumbs]",
      beVisible,
    ),
    newExpectation(
      "should show commit info",
      "[data-cy=commit-info]",
      beVisible,
    ),
    newExpectation(
      "should have viewing message",
      "[data-cy=viewing-message]",
      newShouldArgs(
        "be.visible.and.contain",
        `${currentFromCommit.slice(0, 7)}..${currentToCommit.slice(0, 7)}`,
      ),
    ),
    newExpectation(
      "should not have browse tables link",
      "[data-cy=browse-tables]",
      notExist,
    ),
    newExpectation(
      "should not have commit message",
      "[data-cy=commit-message]",
      notExist,
    ),
    newExpectation(
      `should have no parents`,
      "[data-cy=parent-commit]",
      notExist,
    ),
    newExpectation(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", "trigram_counts"),
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
      "[data-cy=data-diff-trigram_counts]",
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      "[data-cy=data-diff-trigram_counts] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 50),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
