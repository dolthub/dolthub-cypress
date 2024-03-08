import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { shouldBeVisible, shouldNotExist } from "./sharedFunctionsAndVariables";

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

type HiddenCols = {
  hidden: string[];
  shown: string[];
  tableName: string;
};

const colsAreHidden = (hidden: string[]): Tests =>
  hidden
    .map(c => [
      shouldBeVisible(`hidden-column-${c}`),
      shouldNotExist(`repo-data-table-column-${c}`),
    ])
    .flat();

const colsAreShowing = (shown: string[], tableName: string): Tests =>
  shown.map(c =>
    newExpectationWithScrollIntoView(
      `should show column ${c}`,
      `[data-cy=data-diff-${tableName}] [data-cy=repo-data-table-column-${c}]`,
      beVisible,
      true,
    ),
  );

const testHiddenCols = (hiddenCols: HiddenCols): Tests => [
  newExpectationWithClickFlow(
    "should hide unchanged columns",
    "[data-cy=toggle-trim-button]",
    beVisible,
    newClickFlow("[data-cy=toggle-trim-button]", [
      ...colsAreHidden(hiddenCols.hidden),
      ...colsAreShowing(hiddenCols.shown, hiddenCols.tableName),
    ]),
  ),
  newExpectationWithClickFlow(
    "should unhide single column on click",
    `[data-cy=hidden-column-${hiddenCols.hidden[0]}]`,
    beVisible,
    newClickFlow(`[data-cy=hidden-column-${hiddenCols.hidden[0]}]`, [
      ...colsAreHidden(hiddenCols.hidden.slice(1)),
      ...colsAreShowing(
        [...hiddenCols.shown, hiddenCols.hidden[0]],
        hiddenCols.tableName,
      ),
    ]),
  ),
  newExpectationWithClickFlow(
    "should open options dropdown again",
    "[data-cy=options-button]",
    beVisible,
    newClickFlow("[data-cy=options-button]", [
      newExpectationWithClickFlow(
        "should show unchanged columns",
        "[data-cy=toggle-trim-button]",
        beVisible,
        newClickFlow("[data-cy=toggle-trim-button]", [
          ...colsAreShowing(
            [...hiddenCols.hidden, ...hiddenCols.shown],
            hiddenCols.tableName,
          ),
        ]),
      ),
    ]),
  ),
];

export const diffsWithCommitTests = (
  currentFromCommit: string,
  numParents: number,
  hiddenCols?: HiddenCols,
): Tests => [
  ...leftNavTests(currentFromCommit, numParents),
  newExpectationWithClickFlow(
    "Option dropdown should have appropriate links",
    "[data-cy=options-button]",
    beVisible,
    newClickFlow("[data-cy=options-button]", [
      shouldBeVisible("view-sql-link"),
    ]),
  ),
  ...(hiddenCols
    ? testHiddenCols(hiddenCols)
    : [shouldBeVisible("toggle-trim-button")]),
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
