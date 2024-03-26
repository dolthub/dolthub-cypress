import { newClickFlow, newExpectationWithClickFlow } from "../helpers";
import { beVisible, shouldBeVisible } from "./sharedFunctionsAndVariables";

const sqlEditorClickFlow = newClickFlow(
  "[data-cy=sql-editor-collapsed]",
  [shouldBeVisible("sql-editor-expanded")],
  "[data-cy=sql-editor-expanded]",
);

const sqlEditorClickFlowMobile = newClickFlow(
  "[data-cy=mobile-sql-editor-button]",
  [
    shouldBeVisible("mobile-sql-editor"),
    shouldBeVisible("mobile-run-query-button"),
  ],
  "[data-cy=mobile-close-query-editor-button]",
);

export const testSqlConsole = newExpectationWithClickFlow(
  "should find sql console initially closed, and then open on click",
  "[data-cy=sql-editor-collapsed",
  beVisible,
  sqlEditorClickFlow,
);

export const testSqlConsoleMobile = newExpectationWithClickFlow(
  "should find sql console initially closed, and then open on click",
  "[data-cy=mobile-sql-editor-button",
  beVisible,
  sqlEditorClickFlowMobile,
);
