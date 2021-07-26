import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";

const shouldArgs = newShouldArgs("be.visible");

const sqlEditorClickFlow = newClickFlow(
  "[data-cy=sql-editor-collapsed]",
  [
    newExpectation(
      "table footer should be expanded after click",
      "[data-cy=sql-editor-expanded]",
      shouldArgs,
    ),
  ],
  "[data-cy=sql-editor-expanded]",
);

export const testSqlConsole = newExpectationWithClickFlows(
  "should find sql console initially closed, and then open on click",
  "[data-cy=sql-editor-collapsed",
  shouldArgs,
  [sqlEditorClickFlow],
);
