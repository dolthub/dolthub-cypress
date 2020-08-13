import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";

const shouldArgs = newShouldArgs("be.visible");

const sqlEditorClickFlow = newClickFlow(
  "[data-cy=launch-sql-editor-button]",
  [
    newExpectation(
      "table footer should be expanded after click",
      "[data-cy=table-footer-expanded]",
      shouldArgs,
    ),
  ],
  "[data-cy=launch-sql-editor-button]",
);

export const testSqlConsole = newExpectationWithClickFlows(
  "should find table footer initially closed, and then open on click",
  "[data-cy=table-footer]",
  shouldArgs,
  [sqlEditorClickFlow],
);
