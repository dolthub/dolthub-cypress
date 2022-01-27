import { newExpectation, newShouldArgs } from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");

const diffTests = [
  newExpectation(
    "should show back to commit log button",
    "[data-cy=back-to-commits]",
    beVisible,
  ),
];

export const leftNavTests = (
  currentFromCommit: string,
  numParents: number,
): Tests => [
  ...diffTests,
  newExpectation(
    "should show commit diff breadcrumbs",
    "[data-cy=repo-commit-diff-breadcrumbs]",
    beVisible,
  ),
  newExpectation("should show commit info", "[data-cy=commit-info]", beVisible),
  newExpectation(
    "should have viewing message",
    "[data-cy=viewing-message]",
    newShouldArgs("be.visible.and.contain", currentFromCommit),
  ),
  newExpectation(
    "should have browse tables link",
    "[data-cy=browse-tables]",
    beVisible,
  ),
  newExpectation(
    "should have commit message",
    "[data-cy=commit-message]",
    beVisible,
  ),
  newExpectation(
    `should have ${numParents} parents`,
    "[data-cy=parent-commit]",
    newShouldArgs("be.visible.and.have.length", numParents),
  ),
];

export const diffsWithCommits = (
  currentFromCommit: string,
  numParents: number,
): Tests => [
  ...leftNavTests(currentFromCommit, numParents),
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
];

export const noCommits = [
  ...diffTests,
  newExpectation(
    "should show repo breadcrumbs",
    "[data-cy=repo-breadcrumbs]",
    beVisible,
  ),
  newExpectation(
    "should show diff selector",
    "[data-cy=diff-selector]",
    beVisible,
  ),
  newExpectation("should show form select", "[data-cy=form-select]", beVisible),
  newExpectation(
    "should not have viewing message",
    "[data-cy=viewing-message]",
    notExist,
  ),
  newExpectation(
    "should not show commit diff summary",
    "[data-cy=commit-diff-summary]",
    notExist,
  ),
  newExpectation(
    "should not show diff table list summaries",
    "[data-cy=diff-table-list-summaries]",
    notExist,
  ),
  newExpectation(
    "should show select commits message",
    "[data-cy=diff-layout-no-diff]",
    beVisible,
  ),
];
