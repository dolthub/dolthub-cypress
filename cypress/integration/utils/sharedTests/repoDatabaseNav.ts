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
  [
    newExpectation(
      "the Tables tab should be active",
      `[data-cy=active-tab-tables]`,
      beVisible,
    ),
  ],
);

export const checkViewsClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-views]`,
  [
    newExpectation(
      "the Tables tab should be inactive",
      `[data-cy=tab-tables]`,
      beVisible,
    ),
    newExpectation(
      "the Views tab should be active",
      `[data-cy=active-tab-views]`,
      beVisible,
    ),
  ],
);

export const checkQueriesClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-queries]`,
  [
    newExpectation(
      "the Views tab should be inactive",
      `[data-cy=tab-views]`,
      beVisible,
    ),
    newExpectation(
      "the Queries tab should be active",
      `[data-cy=active-tab-queries]`,
      beVisible,
    ),
  ],
);

export const checkSchemaClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-schemas]`,
  [
    newExpectation(
      "the Queries tab should be inactive",
      `[data-cy=tab-queries]`,
      beVisible,
    ),
    newExpectation(
      "the Schemas tab should be active",
      `[data-cy=active-tab-schemas]`,
      beVisible,
    ),
  ],
  `[data-cy=tab-tables]`,
);

// TABLES

export const conditionalBranchTest = (hasBranch: boolean) => {
  const branchExpectation: Expectation = hasBranch
    ? newExpectationWithScrollIntoView(
        "Should have an Add New Table button",
        "[data-cy=repo-tables-add-table]",
        beVisible,
        true
      )
    : newExpectation(
        "Should not have an Add New Table button",
        "[data-cy=repo-tables-add-table]",
        newShouldArgs("not.exist"),
      );

  return branchExpectation;
};

const testTableEditClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-tables-table-${testTable}-edit]`, [
    newExpectation(
      "",
      `[data-cy=repo-tables-table-editing]`,
      newShouldArgs("be.visible.and.contain", "Editing"),
    ),
  ]);

export const conditionalEditButtonTest = (
  loggedIn: boolean,
  testTable: string,
) => {
  const editExpectation: Expectation = loggedIn
    ? newExpectationWithClickFlows(
        "Should have an Edit button",
        `[data-cy=repo-tables-table-${testTable}-edit]`,
        beVisible,
        [testTableEditClickFlow(testTable)],
      )
    : newExpectation(
        "Should not have an Edit button",
        `[data-cy=repo-tables-table-${testTable}-edit]`,
        newShouldArgs("not.exist"),
      );

  return editExpectation;
};

const testTablePlayClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-tables-table-${testTable}-play]`, [
    newExpectation(
      "",
      `[data-cy=repo-tables-table-${testTable}-column-list]`,
      beVisible,
    ),
    newExpectation(
      "",
      `[data-cy=repo-tables-table-viewing]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),   
  ],
  `[data-cy=repo-tables-table-${testTable}]`
  );

const emptyTablesExpectation = (hasBranch: boolean): Tests => [
  newExpectation(
    "should show empty tables message",
    "[data-cy=repo-tables-empty]",
    beVisible,
  ),
  conditionalBranchTest(hasBranch),
];

const notEmptyTableExpectations = (
  hasBranch: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable: string,
): Tests => [
  newExpectation(
    `should have table list with ${tableLen} items`,
    "[data-cy=repo-tables-table-list] > ol > li",
    newShouldArgs("be.visible.and.have.length", tableLen),
  ),
  newExpectationWithClickFlows(
    `should have test table ${testTable}`,
    `[data-cy=repo-tables-table-${testTable}]`,
    beVisible,
    [testTablePlayClickFlow(testTable)],
  ),
  conditionalEditButtonTest(loggedIn, testTable),
  conditionalBranchTest(hasBranch),
  // WRITE MORE TABLE TESTS HERE
  //
];

//* Use tableExpectations when table is populated (left nav is initially open)
//* Use testTablesSection when table is not populated (left nav is initially closed)

export const tableExpectations = (
  hasBranch: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
): Expectation[] => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation(hasBranch)
      : notEmptyTableExpectations(hasBranch, loggedIn, tableLen, testTable);

  return [
    newExpectation(
      "should have repo branch selector",
      "[data-cy=branch-selector]",
      beVisible,
    ),
    ...expectations,
  ];
};

export const testTablesSection = (
  hasBranch: boolean,
  loggedIn: boolean,
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
      [
        clickToOpenNavClickFlow,
        checkViewsClickflow,
        checkQueriesClickflow,
        checkSchemaClickflow,
      ],
    ),
    ...tableExpectations(hasBranch, loggedIn, tableLen, testTable),
  ];
};

// INDEXES
//! No longer on the site
// const testIndexClickFlow = (testTable: string): ClickFlow =>
//   newClickFlow(`[data-cy=repo-indexes-table-${testTable}]`, [
//     newExpectation(
//       "",
//       `[data-cy=repo-indexes-table-${testTable}-no-indexes]`,
//       beVisible,
//     ),
//   ]);

// const emptyIndexesExpectation = [
//   newExpectation("", "[data-cy=repo-indexes-empty]", beVisible),
// ];

// const notEmptyIndexesExpectations = (
//   indexLen: number,
//   testTable: string,
// ): Tests => [
//   newExpectation(
//     "",
//     "[data-cy=repo-indexes-table-list] > li",
//     newShouldArgs("be.visible.and.have.length", indexLen),
//   ),
//   newExpectationWithClickFlows(
//     "",
//     `[data-cy=repo-indexes-table-${testTable}]`,
//     beVisible,
//     [testIndexClickFlow(testTable)],
//   ),
// ];

// const indexesClickFlow = (indexLen: number, testTable?: string): ClickFlow => {
//   const expectations =
//     indexLen === 0 || !testTable
//       ? emptyIndexesExpectation
//       : notEmptyIndexesExpectations(indexLen, testTable);

//   return newClickFlow(
//     "[data-cy=repo-indexes]",
//     expectations,
//     "[data-cy=repo-indexes]",
//   );
// };

// export const testIndexesSection = (
//   indexLen: number,
//   testTable?: string,
// ): Expectation => {
//   if (indexLen > 0 && !testTable) {
//     throw new Error("Cannot have indexLen > 0 and no testTable");
//   }
//   return newExpectationWithClickFlows(
//     "should have repo Indexes section",
//     "[data-cy=repo-indexes]",
//     beVisible,
//     [indexesClickFlow(indexLen, testTable)],
//   );
// };

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

// KATIE WRITE SCHEMAS TESTS, ALL
