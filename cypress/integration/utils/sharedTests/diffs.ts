import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
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

export const leftNavDiffRangeTests = (fromCommit: string, toCommit: string) => [
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
  newExpectation("should show commit info", "[data-cy=commit-info]", beVisible),
  newExpectation(
    "should have viewing message",
    "[data-cy=viewing-message]",
    newShouldArgs(
      "be.visible.and.contain",
      `${fromCommit.slice(0, 7)}..${toCommit.slice(0, 7)}`,
    ),
  ),
  newExpectation(
    "should not have commit message",
    "[data-cy=commit-message]",
    notExist,
  ),
  newExpectation(`should have no parents`, "[data-cy=parent-commit]", notExist),
];

export const diffsWithCommitTests = (
  currentFromCommit: string,
  numParents: number,
): Tests => [
  ...leftNavTests(currentFromCommit, numParents),
  newExpectationWithClickFlows(
    "Option dropdown should have appropriate links",
    "[data-cy=options-button]",
    beVisible,
    [
      newClickFlow("[data-cy=options-button]", [
        newExpectation(
          "should have toggle whitespace button",
          "[data-cy=toggle-whitespace-button]",
          beVisible,
        ),
        newExpectation(
          "should show View SQL link",
          "[data-cy=view-sql-link]",
          beVisible,
        ),
      ]),
    ],
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

export const noCommitsTests = [
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
