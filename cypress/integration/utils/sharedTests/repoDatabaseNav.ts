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
        true,
      )
    : newExpectation(
        "Should not have an Add New Table button",
        "[data-cy=repo-tables-add-table]",
        notExist,
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
        notExist,
      );

  return editExpectation;
};

const testTablePlayClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(
    `[data-cy=repo-tables-table-${testTable}-play]`,
    [
      newExpectation(
        "Should show a list of columns",
        `[data-cy=repo-tables-table-${testTable}-column-list]`,
        beVisible,
      ),
      newExpectation(
        "Should show 'viewing'",
        `[data-cy=repo-tables-table-viewing]`,
        newShouldArgs("be.visible.and.contain", "Viewing"),
      ),
    ],
    `[data-cy=repo-tables-table-${testTable}]`,
  );

export const conditionalPlayButtonTest = (
  hasDocs: boolean,
  testTable: string,
) => {
  const playExpectation: Tests = hasDocs
    ? [
        newExpectationWithClickFlows(
          `should have test table ${testTable}`,
          `[data-cy=repo-tables-table-${testTable}]`,
          beVisible,
          [testTablePlayClickFlow(testTable)],
        ),
      ]
    : [
        newExpectation(
          "Should show a list of columns",
          `[data-cy=repo-tables-table-${testTable}-column-list]`,
          beVisible,
        ),
        newExpectation(
          "Should show 'viewing'",
          `[data-cy=repo-tables-table-viewing]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ];

  return playExpectation;
};

const emptyTablesExpectation = (hasBranch: boolean): Tests => [
  newExpectation(
    "should show empty tables message",
    "[data-cy=repo-tables-empty]",
    beVisible,
  ),
  conditionalBranchTest(hasBranch),
];

const notEmptyTableExpectations = (
  hasDocs: boolean,
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
  // newExpectationWithClickFlows(
  //   `should have test table ${testTable}`,
  //   `[data-cy=repo-tables-table-${testTable}]`,
  //   beVisible,
  //   [testTablePlayClickFlow(testTable)],
  // ),
  ...conditionalPlayButtonTest(hasDocs, testTable),
  conditionalEditButtonTest(loggedIn, testTable),
  conditionalBranchTest(hasBranch),
  // WRITE MORE TABLE TESTS HERE
  //
];

//* Use tableExpectations when table is populated (left nav is initially open)
//* Use testTablesSection when table is not populated (left nav is initially closed)

export const tableExpectations = (
  hasDocs: boolean,
  hasBranch: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
): Expectation[] => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation(hasBranch)
      : notEmptyTableExpectations(
          hasDocs,
          hasBranch,
          loggedIn,
          tableLen,
          testTable,
        );

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
  hasDocs: boolean,
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
    ...tableExpectations(hasDocs, hasBranch, loggedIn, tableLen, testTable),
  ];
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
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `SELECT * FROM ${testView}`),
    ),
  ]);

export const emptyViewsExpectation = (hasBranch: boolean) => {
  const viewsExpectation: Expectation = hasBranch
    ? newExpectation("", "[data-cy=repo-no-views]", beVisible)
    : newExpectation("", "[data-cy=repo-views-empty]", beVisible);

  return viewsExpectation;
};

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

const viewsClickFlow = (
  hasBranch: boolean,
  viewsLen: number,
  testView?: string,
): ClickFlow => {
  const expectations =
    viewsLen === 0 || !testView
      ? [emptyViewsExpectation(hasBranch)]
      : notEmptyViewsExpectations(viewsLen, testView);

  return newClickFlow("[data-cy=tab-views]", expectations);
};

export const testViewsSection = (
  hasBranch: boolean,
  viewsLen: number,
  testView?: string,
): Expectation => {
  if (viewsLen > 0 && !testView) {
    throw new Error("Cannot have viewsLen > 0 and no testView");
  }
  return newExpectationWithClickFlows(
    "should have repo Views section",
    "[data-cy=tab-views]",
    beVisible,
    [viewsClickFlow(hasBranch, viewsLen, testView)],
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
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `select * from ${testQuery}`),
    ),
  ]);

export const emptyQueriesExpectation = (hasBranch: boolean) => {
  const queriesExpectation: Expectation = hasBranch
    ? newExpectation("", "[data-cy=repo-no-queries]", beVisible)
    : newExpectation("", "[data-cy=repo-queries-empty]", beVisible);

  return queriesExpectation;
};

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
    "should successfully execute a query",
    `[data-cy=repo-query-list-query-${testQuery}]`,
    beVisible,
    [testQueryClickFlow(testQuery)],
  ),
];

const queryCatalogClickFlow = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
): ClickFlow => {
  const expectations =
    queryLen === 0 || !testQuery
      ? [emptyQueriesExpectation(hasBranch)]
      : notEmptyQueriesExpectations(queryLen, testQuery);

  return newClickFlow("[data-cy=tab-queries]", expectations);
};

export const testQueryCatalogSection = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
): Expectation => {
  if (queryLen > 0 && !testQuery) {
    throw new Error("Cannot have queryLen > 0 and no testQuery");
  }
  return newExpectationWithClickFlows(
    "should have repo Query Catalog section",
    "[data-cy=tab-queries]",
    beVisible,
    [queryCatalogClickFlow(hasBranch, queryLen, testQuery)],
  );
};

// SCHEMAS

const testSchemaClickFlow = (testSchema: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-schema-button-${testSchema}]`, [
    newExpectation(
      "",
      `[data-cy=repo-schema-viewing-${testSchema}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `SHOW CREATE TABLE ${testSchema}`),
    ),
  ]);

export const emptySchemaExpectation = (hasBranch: boolean) => {
  const schemaExpectation: Expectation = hasBranch
    ? newExpectation("", "[data-cy=repo-no-schemas]", beVisible)
    : newExpectation("", "[data-cy=repo-schemas-empty]", beVisible);

  return schemaExpectation;
};

const notEmptySchemaExpectations = (
  schemaLen: number,
  testSchema: string,
): Tests => [
  newExpectation(
    "",
    "[data-cy=repo-tables-schema-list] > ol > li",
    newShouldArgs("be.visible.and.have.length", schemaLen),
  ),
  newExpectationWithClickFlows(
    "should successfully execute a schema",
    `[data-cy=repo-schema-list-schema-${testSchema}]`,
    beVisible,
    [testSchemaClickFlow(testSchema)],
  ),
];

const schemaClickFlow = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema?: string,
): ClickFlow => {
  const expectations =
    schemaLen === 0 || !testSchema
      ? [emptySchemaExpectation(hasBranch)]
      : notEmptySchemaExpectations(schemaLen, testSchema);

  return newClickFlow("[data-cy=tab-schemas]", expectations);
};

export const testSchemaSection = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema?: string,
): Expectation => {
  if (schemaLen > 0 && !testSchema) {
    throw new Error("Cannot have schemaLen > 0 and no testSchema");
  }
  return newExpectationWithClickFlows(
    "should have repo Schema section",
    "[data-cy=tab-schemas]",
    beVisible,
    [schemaClickFlow(hasBranch, schemaLen, testSchema)],
  );
};