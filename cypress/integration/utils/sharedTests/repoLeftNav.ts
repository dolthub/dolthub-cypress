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

// ABOUT

const aboutClickFlow = (initiallyOpen: boolean): ClickFlow =>
  newClickFlow(
    initiallyOpen ? "" : "[data-cy=repo-about]",
    [
      newExpectation("", "[data-cy=repo-about-details]", beVisible),
      newExpectation("", "[data-cy=repo-description]", beVisible),
      newExpectation("", "[data-cy=repo-visibility]", beVisible),
      newExpectation("", "[data-cy=repo-permission]", beVisible),
    ],
    "[data-cy=repo-about]",
  );

export const testAboutSection = (initiallyOpen: boolean): Expectation =>
  newExpectationWithClickFlows(
    "should have repo About section",
    "[data-cy=repo-about]",
    beVisible,
    [aboutClickFlow(initiallyOpen)],
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
    [testTableClickFlow(tableLen, testTable)],
  ),
];

const tablesClickFlow = (tableLen: number, testTable?: string): ClickFlow => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation
      : notEmptyTableExpectations(tableLen, testTable);

  return newClickFlow("[data-cy=repo-tables-table-list]", expectations);
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
    "[data-cy=repo-tables-table-list]",
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

// RELEASES LIST

const releasesListClickFlow = (tagLen: number): ClickFlow => {
  const expectations =
    tagLen === 0
      ? []
      : [
          newExpectation(
            "",
            "[data-cy=repo-releases-list] > li",
            newShouldArgs("be.visible.and.have.length", tagLen),
          ),
        ];

  return newClickFlow(
    "[data-cy=repo-releases]",
    expectations,
    "[data-cy=repo-releases]",
  );
};

export const testReleasesSection = (tagLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have repo Tag List section",
    "[data-cy=repo-releases]",
    beVisible,
    [releasesListClickFlow(tagLen)],
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
    newExpectationWithScrollIntoView(
      "should render link to see more queries",
      "[data-cy=repo-pull-requests-see-all]",
      beVisible,
      true,
    ),
    newExpectation("", "[data-cy=repo-pull-requests-see-all]", beVisible),
  ];
  const expectations =
    pullLen === 0 ? [emptyPullsExpectation] : notEmptyExpectations;

  return newClickFlow(
    "[data-cy=repo-pull-requests]",
    [
      ...expectations,
      newExpectation("", "[data-cy=new-pull-button]", beVisible),
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

// COLLABORATORS

const emptyCollabsExpectation = newExpectation(
  "",
  "[data-cy=collab-table-no-collabs]",
  beVisible,
);

const collaboratorsClickFlow = (collabsLen: number): ClickFlow => {
  const notEmptyExpectations = newExpectation(
    "",
    "[data-cy=collab-table] tr",
    newShouldArgs("be.visible.and.have.length", collabsLen),
  );

  const expectation =
    collabsLen === 0 ? emptyCollabsExpectation : notEmptyExpectations;

  return newClickFlow(
    "[data-cy=repo-manage-access]",
    [expectation, newExpectation("", "[data-cy=add-collab-button]", beVisible)],
    "[data-cy=repo-manage-access]",
  );
};

export const testCollaboratorsSection = (collabsLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have repo Collaborators section for user with write perms",
    "[data-cy=repo-manage-access]",
    beVisible,
    [collaboratorsClickFlow(collabsLen)],
  );

// REPO SETTINGS

const settingsClickFlow = newClickFlow(
  "[data-cy=repo-repo-settings]",
  [
    newExpectation("", "[data-cy=repo-settings-webhooks]", beVisible),
    newExpectation("", "[data-cy=update-repo-form]", beVisible),
  ],
  "[data-cy=repo-repo-settings]",
);

export const testRepoSettings = newExpectationWithClickFlows(
  "should have Repo Settings section for user with write perms",
  "[data-cy=repo-repo-settings]",
  beVisible,
  [settingsClickFlow],
);
