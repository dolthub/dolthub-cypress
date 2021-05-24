import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");

export const clickToOpenNavClickFlow: ClickFlow = newClickFlow(
  "[data-cy=left-nav-toggle-icon]",
  [],
);

// TABLES

const testTableClickFlow = (tableLen: number, testTable: string): ClickFlow =>
  newClickFlow(
    `[data-cy=repo-tables-table-${testTable}${tableLen === 1 ? "" : "-play"}]`,
    [
      newExpectation(
        "",
        `[data-cy=repo-tables-table-${testTable}-column-list]`,
        beVisible,
      ),
    ],
  );

const emptyTablesExpectation = [
  newExpectation(
    "should show empty tables message",
    "[data-cy=repo-tables-empty]",
    beVisible,
  ),
];

const notEmptyTableExpectations = (
  tableLen: number,
  testTable: string,
): Tests => [
  newExpectation(
    "",
    "[data-cy=repo-tables-table-list] > li",
    newShouldArgs("be.visible.and.have.length", tableLen),
  ),
  newExpectationWithClickFlows(
    "",
    `[data-cy=repo-tables-table-${testTable}]`,
    beVisible,
    [testTableClickFlow(tableLen, testTable)],
  ),
];

const tableExpectations = (
  tableLen: number,
  testTable?: string,
): Expectation[] =>
  tableLen === 0 || !testTable
    ? emptyTablesExpectation
    : notEmptyTableExpectations(tableLen, testTable);

export const testTablesSection = (
  tableLen: number,
  testTable?: string,
): Expectation[] => {
  if (tableLen > 0 && !testTable) {
    throw new Error("Cannot have tableLen > 0 and no testTable");
  }
  return [
    newExpectationWithClickFlows(
      "should open left database navigation",
      "[data-cy=left-nav-toggle-icon]",
      beVisible,
      [clickToOpenNavClickFlow],
    ),
    newExpectation(
      "should have repo branch selector",
      "[data-cy=branch-selector]",
      beVisible,
    ),
    ...tableExpectations(tableLen, testTable),
  ];
};

// INDEXES

const testIndexClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-indexes-table-${testTable}]`, [
    newExpectation(
      "",
      `[data-cy=repo-indexes-table-${testTable}-no-indexes]`,
      beVisible,
    ),
  ]);

const emptyIndexesExpectation = [
  newExpectation("", "[data-cy=repo-indexes-empty]", beVisible),
];

const notEmptyIndexesExpectations = (
  indexLen: number,
  testTable: string,
): Tests => [
  newExpectation(
    "",
    "[data-cy=repo-indexes-table-list] > li",
    newShouldArgs("be.visible.and.have.length", indexLen),
  ),
  newExpectationWithClickFlows(
    "",
    `[data-cy=repo-indexes-table-${testTable}]`,
    beVisible,
    [testIndexClickFlow(testTable)],
  ),
];

const indexesClickFlow = (indexLen: number, testTable?: string): ClickFlow => {
  const expectations =
    indexLen === 0 || !testTable
      ? emptyIndexesExpectation
      : notEmptyIndexesExpectations(indexLen, testTable);

  return newClickFlow(
    "[data-cy=repo-indexes]",
    expectations,
    "[data-cy=repo-indexes]",
  );
};

export const testIndexesSection = (
  indexLen: number,
  testTable?: string,
): Expectation => {
  if (indexLen > 0 && !testTable) {
    throw new Error("Cannot have indexLen > 0 and no testTable");
  }
  return newExpectationWithClickFlows(
    "should have repo Indexes section",
    "[data-cy=repo-indexes]",
    beVisible,
    [indexesClickFlow(indexLen, testTable)],
  );
};

// VIEWS

const testViewClickFlow = (testView: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-views-view-${testView}]`, [
    newExpectation(
      "",
      `[data-cy=repo-views-view-button-${testView}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=repo-table-header-query]",
      newShouldArgs("be.visible.and.contain", `SELECT * FROM ${testView}`),
    ),
  ]);

const emptyViewsExpectation = [
  newExpectation("", "[data-cy=repo-no-views]", beVisible),
];

const notEmptyViewsExpectations = (
  viewsLen: number,
  testView: string,
): Tests => [
  newExpectation(
    "",
    "[data-cy=repo-views-list] > li",
    newShouldArgs("be.visible.and.have.length", viewsLen),
  ),
  newExpectationWithClickFlows(
    "should successfully execute a view",
    `[data-cy=repo-views-view-${testView}]`,
    beVisible,
    [testViewClickFlow(testView)],
  ),
];

const viewsClickFlow = (viewsLen: number, testView?: string): ClickFlow => {
  const expectations =
    viewsLen === 0 || !testView
      ? emptyViewsExpectation
      : notEmptyViewsExpectations(viewsLen, testView);

  return newClickFlow(
    "[data-cy=repo-views]",
    expectations,
    "[data-cy=repo-views]",
  );
};

export const testViewsSection = (
  viewsLen: number,
  testView?: string,
): Expectation => {
  if (viewsLen > 0 && !testView) {
    throw new Error("Cannot have viewsLen > 0 and no testView");
  }
  return newExpectationWithClickFlows(
    "should have repo Views section",
    "[data-cy=repo-views]",
    beVisible,
    [viewsClickFlow(viewsLen, testView)],
  );
};

// QUERY CATALOG

const testQueryClickFlow = (testQuery: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-query-button-${testQuery}]`, [
    newExpectation(
      "",
      `[data-cy=repo-query-viewing-${testQuery}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=repo-table-header-query] div > span",
      newShouldArgs("be.visible.and.contain", testQuery),
    ),
  ]);

const emptyQueriesExpectation = [
  newExpectation("", "[data-cy=repo-no-queries]", beVisible),
  newExpectation("", "[data-cy=repo-query-see-all]", notExist),
];

const notEmptyQueriesExpectations = (
  queryLen: number,
  testQuery: string,
): Tests => [
  newExpectationWithScrollIntoView(
    "should render link to see more queries",
    "[data-cy=repo-query-see-all]",
    beVisible,
    true,
  ),
  newExpectation(
    "",
    "[data-cy=repo-query-list] > li",
    newShouldArgs("be.visible.and.have.length", queryLen),
  ),
  newExpectationWithClickFlows(
    "should successfully execute a view",
    `[data-cy=repo-query-list-query-${testQuery}]`,
    beVisible,
    [testQueryClickFlow(testQuery)],
  ),
];

const queryCatalogClickFlow = (
  queryLen: number,
  testQuery?: string,
): ClickFlow => {
  const expectations =
    queryLen === 0 || !testQuery
      ? emptyQueriesExpectation
      : notEmptyQueriesExpectations(queryLen, testQuery);

  return newClickFlow(
    "[data-cy=repo-query-catalog]",
    expectations,
    "[data-cy=repo-query-catalog]",
  );
};

export const testQueryCatalogSection = (
  queryLen: number,
  testQuery?: string,
): Expectation => {
  if (queryLen > 0 && !testQuery) {
    throw new Error("Cannot have queryLen > 0 and no testQuery");
  }
  return newExpectationWithClickFlows(
    "should have repo Query Catalog section",
    "[data-cy=repo-query-catalog]",
    beVisible,
    [queryCatalogClickFlow(queryLen, testQuery)],
  );
};
