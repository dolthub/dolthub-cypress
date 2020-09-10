import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notBeVisible = newShouldArgs("not.be.visible");

// HEADER

const cloneClickFlow = newClickFlow(
  "[data-cy=repo-clone-button]",
  [
    newExpectation(
      "",
      "[data-cy=repo-clone-code-block]",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ],
  ".popup-overlay",
);

const forkButtonClickFlow = newClickFlow(
  "[data-cy=repo-fork-button]",
  [newExpectation("", "[data-cy=create-fork-modal]", beVisible)],
  "[data-cy=close-modal]",
);

export const testRepoHeaderForAll = (
  repoName: string,
  ownerName: string,
): Tests => [
  newExpectation(
    "should have repo header",
    "[data-cy=repo-left-header]",
    beVisible,
  ),
  newExpectation(
    "should have owner's name",
    "[data-cy=left-owner-name]",
    newShouldArgs("be.visible.and.contain", ownerName),
  ),
  newExpectation(
    "should have repo's name",
    "[data-cy=left-repo-name]",
    newShouldArgs("be.visible.and.contain", repoName),
  ),
  newExpectation(
    "should have repo star button",
    "[data-cy=repo-star]",
    beVisible,
  ),
  newExpectation(
    "should have repo fork button",
    "[data-cy=repo-fork-button]",
    beVisible,
  ),
  newExpectationWithClickFlows(
    "should have repo clone button",
    "[data-cy=repo-clone-button]",
    beVisible,
    [cloneClickFlow],
  ),
];

export const testRepoHeaderWithBranch = (
  repoName: string,
  ownerName: string,
): Tests => [
  ...testRepoHeaderForAll(repoName, ownerName),
  newExpectationWithClickFlows(
    "should open create fork modal on fork button click",
    "[data-cy=repo-fork-button]",
    beVisible,
    [forkButtonClickFlow],
  ),
  newExpectation(
    "should have repo branch selector",
    "[data-cy=branch-selector]",
    beVisible,
  ),
];

// ABOUT

const aboutClickFlow = newClickFlow(
  "[data-cy=repo-about]",
  [
    newExpectation("", "[data-cy=repo-about-details]", beVisible),
    newExpectation("", "[data-cy=repo-description]", beVisible),
    newExpectation("", "[data-cy=repo-visibility]", beVisible),
    newExpectation("", "[data-cy=repo-permission]", beVisible),
  ],
  "[data-cy=repo-about]",
);

export const testAboutSection = newExpectationWithClickFlows(
  "should have repo About section",
  "[data-cy=repo-about]",
  beVisible,
  [aboutClickFlow],
);

// TABLES

const testTableClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-tables-table-${testTable}]`, [
    newExpectation(
      "",
      `[data-cy=repo-tables-table-${testTable}-column-list]`,
      beVisible,
    ),
  ]);

const emptyTablesExpectation = [
  newExpectation("", "[data-cy=repo-tables-empty]", beVisible),
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
    [testTableClickFlow(testTable)],
  ),
];

const tablesClickFlow = (tableLen: number, testTable?: string): ClickFlow => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation
      : notEmptyTableExpectations(tableLen, testTable);

  return newClickFlow(
    "[data-cy=repo-tables]",
    expectations,
    "[data-cy=repo-tables]",
  );
};

export const testTablesSection = (
  tableLen: number,
  testTable?: string,
): Expectation => {
  if (tableLen > 0 && !testTable) {
    throw new Error("Cannot have tableLen > 0 and no testTable");
  }
  return newExpectationWithClickFlows(
    "should have repo Tables section",
    "[data-cy=repo-tables]",
    beVisible,
    [tablesClickFlow(tableLen, testTable)],
  );
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

// COMMIT LOG

const commitLogClickFlow = (commitLen: number): ClickFlow =>
  newClickFlow(
    "[data-cy=repo-commit-log]",
    [
      newExpectation(
        "",
        "[data-cy=repo-commit-log-history-commits] > li",
        newShouldArgs("be.visible.and.have.length", commitLen),
      ),
      newExpectation("", "[data-cy=repo-commits-see-all-button]", beVisible),
    ],
    "[data-cy=repo-commit-log]",
  );

export const testCommitSection = (commitLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have repo Commit Log section",
    "[data-cy=repo-commit-log]",
    beVisible,
    [commitLogClickFlow(commitLen)],
  );

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
  newExpectation("", "[data-cy=repo-query-see-all]", notBeVisible),
];

const notEmptyQueriesExpectations = (
  queryLen: number,
  testQuery: string,
): Tests => [
  newExpectation(
    "",
    "[data-cy=repo-query-list] > li",
    newShouldArgs("be.visible.and.have.length", queryLen),
  ),
  newExpectation("", "[data-cy=repo-query-see-all]", beVisible),
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

// PULL REQUESTS

const emptyPullsExpectation = newExpectation(
  "",
  "[data-cy=repo-pull-requests-empty]",
  beVisible,
);

const pullRequestsClickFlow = (pullLen: number): ClickFlow => {
  const notEmptyExpectations = [
    newExpectation(
      "",
      "[data-cy=repo-pull-requests-list] > li",
      newShouldArgs("be.visible.and.have.length", pullLen),
    ),
    newExpectation("", "[data-cy=repo-pull-requests-see-all]", beVisible),
  ];
  const expectations =
    pullLen === 0 ? [emptyPullsExpectation] : notEmptyExpectations;

  return newClickFlow(
    "[data-cy=repo-pull-requests]",
    [
      ...expectations,
      newExpectation("", "[data-cy=new-pull-button]", notBeVisible),
    ],
    "[data-cy=repo-pull-requests]",
  );
};

export const testPullRequestsSection = (pullLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have repo Pull Requests section",
    "[data-cy=repo-pull-requests]",
    beVisible,
    [pullRequestsClickFlow(pullLen)],
  );

// SECTIONS NOT VISIBLE FOR EMPTY

export const testSectionsNotVisible: Tests = [
  newExpectation(
    "should not have repo Indexes section for repo with no data",
    "[data-cy=repo-indexes]",
    notBeVisible,
  ),
  newExpectation(
    "should not have repo Commit Log section for repo with no data",
    "[data-cy=repo-commit-log]",
    notBeVisible,
  ),
  newExpectation(
    "should not have repo Views section for repo with no data",
    "[data-cy=repo-views]",
    notBeVisible,
  ),
  newExpectation(
    "should not have repo Query Catalog section for repo with no tables",
    "[data-cy=repo-query-catalog]",
    notBeVisible,
  ),
];
