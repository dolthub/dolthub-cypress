import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, ShouldArgs, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

// Doltgres table names are schema-qualified (e.g. `public.test_table`), so
// escape dots before using a name in an unquoted data-cy attribute selector.
const cyEscape = (name: string): string => name.replace(/\./g, "\\.");
const notExist = newShouldArgs("not.exist");

const clickToOpenNavClickFlow: ClickFlow = newClickFlow(
  "[data-cy=left-nav-toggle-icon]",
  [
    newExpectation(
      "the Tables tab should be active",
      `[data-cy=active-tab-tables]`,
      beVisible,
    ),
  ],
);

const checkViewsClickflow: ClickFlow = newClickFlow(`[data-cy=tab-views]`, [
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
]);

const checkQueriesClickflow: ClickFlow = newClickFlow(`[data-cy=tab-queries]`, [
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
]);

const checkSchemaClickflow: ClickFlow = newClickFlow(
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

const testTableEditClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-tables-table-${cyEscape(testTable)}-edit]`, [
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
    ? newExpectationWithClickFlow(
        "Should have an Edit button",
        `[data-cy=repo-tables-table-${cyEscape(testTable)}-edit]`,
        beVisible,
        testTableEditClickFlow(testTable),
      )
    : newExpectation(
        "Should not have an Edit button",
        `[data-cy=repo-tables-table-${cyEscape(testTable)}-edit]`,
        notExist,
      );

  return editExpectation;
};

const testTablePlayClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(
    `[data-cy=repo-tables-table-${cyEscape(testTable)}-play]`,
    [
      newExpectation(
        "Should show a list of columns",
        `[data-cy=repo-tables-table-${cyEscape(testTable)}-column-list]`,
        beVisible,
      ),
      newExpectation(
        "Should show 'viewing'",
        `[data-cy=repo-tables-table-viewing]`,
        newShouldArgs("be.visible.and.contain", "Viewing"),
      ),
    ],
    `[data-cy=repo-tables-table-${cyEscape(testTable)}]`,
  );

export const conditionalPlayButtonTest = (
  hasDocs: boolean,
  testTable: string,
) => {
  const playExpectation: Tests = hasDocs
    ? [
        newExpectationWithClickFlow(
          `should have test table ${testTable}`,
          `[data-cy=repo-tables-table-${cyEscape(testTable)}]`,
          beVisible,
          testTablePlayClickFlow(testTable),
        ),
      ]
    : [
        newExpectation(
          "Should show a list of columns",
          `[data-cy=repo-tables-table-${cyEscape(testTable)}-column-list]`,
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

export const conditionalViewTableMobileTest = (
  hasDocs: boolean,
  testTable: string,
) => {
  const playExpectation: Tests = hasDocs
    ? [
        newExpectationWithClickFlow(
          `should have test table ${testTable}`,
          `[data-cy=repo-tables-table-${cyEscape(testTable)}]`,
          beVisible,
          newClickFlow(
            `[data-cy=repo-tables-table-${cyEscape(testTable)}] a:first`,
            [
              newExpectation(
                "Should show table",
                `[data-cy=mobile-repo-data-table]`,
                beVisible,
              ),
            ],
            `[data-cy=show-table-nav-button]`,
          ),
        ),
        newExpectation(
          "Should show 'viewing'",
          `[data-cy=repo-tables-table-viewing]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ]
    : [
        newExpectation(
          "Should show 'viewing'",
          `[data-cy=repo-tables-table-viewing-mobile]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ];

  return playExpectation;
};

const emptyTablesExpectation: Tests = [
  newExpectation(
    "should show empty tables message",
    "[data-cy=repo-tables-empty]",
    beVisible,
  ),
  newExpectationWithScrollIntoView(
    "should have an Add New Table button",
    "[data-cy=repo-tables-add-table]",
    beVisible,
    true,
  ),
];

const notEmptyTableExpectations = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable: string,
  isMobile = false,
): Tests =>
  isMobile
    ? [
        newExpectation(
          `should have table list with ${tableLen} items`,
          "[data-cy=repo-tables-table-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", tableLen),
        ),

        ...conditionalViewTableMobileTest(hasDocs, testTable),
      ]
    : [
        newExpectation(
          `should have table list with ${tableLen} items`,
          "[data-cy=repo-tables-table-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", tableLen),
        ),

        ...conditionalPlayButtonTest(hasDocs, testTable),
        conditionalEditButtonTest(loggedIn, testTable),
        newExpectationWithScrollIntoView(
          "should have an Add New Table button",
          "[data-cy=repo-tables-add-table]",
          beVisible,
          true,
        ),
      ];

//* Use tableExpectations when table is populated (left nav is initially open)
//* Use testTablesSection when table is not populated (left nav is initially closed)

export const tableExpectations = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
  isMobile = false,
): Expectation[] => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation
      : notEmptyTableExpectations(
          hasDocs,
          loggedIn,
          tableLen,
          testTable,
          isMobile,
        );

  return isMobile
    ? [
        newExpectationWithClickFlow(
          "should show repo nav button",
          "[data-cy=show-table-nav-button]",
          beVisible,
          newClickFlow("[data-cy=show-table-nav-button]", []),
        ),
        newExpectation(
          "should have repo branch selector",
          "[data-cy=branch-and-tag-selector]",
          beVisible,
        ),
        ...expectations,
      ]
    : [
        newExpectation(
          "should have repo branch selector",
          "[data-cy=branch-and-tag-selector]",
          beVisible,
        ),
        ...expectations,
      ];
};

export const testTablesSection = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
): Expectation[] => {
  if (tableLen > 0 && !testTable) {
    throw new Error("Cannot have tableLen > 0 and no testTable");
  }
  return [
    newExpectationWithClickFlow(
      "should open left database navigation",
      "[data-cy=left-nav-toggle-icon]",
      beVisible,
      clickToOpenNavClickFlow,
    ),
    newExpectationWithClickFlow(
      "should check views",
      "[data-cy=tab-views]",
      beVisible,
      checkViewsClickflow,
    ),
    newExpectationWithClickFlow(
      "should check queries",
      "[data-cy=tab-queries]",
      beVisible,
      checkQueriesClickflow,
    ),
    newExpectationWithClickFlow(
      "should check schema",
      "[data-cy=tab-schemas]",
      beVisible,
      checkSchemaClickflow,
    ),
    ...tableExpectations(hasDocs, loggedIn, tableLen, testTable),
  ];
};

export const testClickDeleteRow = (
  modalTag: string,
  modalShould: ShouldArgs,
): Expectation[] => {
  const modalName = modalTag.split("-").join(" ");
  return [
    newExpectationWithClickFlow(
      "should click first row dropdown button",
      "[data-cy=desktop-repo-data-table-row-0-col-0]",
      beVisible,
      newClickFlow(
        "[data-cy=desktop-row-dropdown-button]:first",
        [],
        "[data-cy=desktop-delete-row-button]",
        true,
      ),
    ),
    newExpectationWithClickFlow(
      `should show ${modalName}`,
      `[data-cy=${modalTag}]`,
      modalShould,
      newClickFlow("[data-cy=close-modal]", [
        newExpectation(
          `should not have open ${modalName}`,
          `[data-cy=${modalTag}]`,
          notExist,
        ),
      ]),
    ),
  ];
};

// VIEWS

const testViewClickFlow = (testView: string, viewQuery: string): ClickFlow =>
  newClickFlow(`[data-cy=db-views-view-${cyEscape(testView)}]`, [
    newExpectation(
      "",
      `[data-cy=repo-views-view-button-${cyEscape(testView)}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", viewQuery),
    ),
  ]);

const testViewMobile = (testView: string, viewQuery: string): Expectation[] => [
  newExpectationWithClickFlow(
    "should click view",
    `[data-cy=db-views-view-${cyEscape(testView)}]`,
    beVisible,
    newClickFlow(
      `[data-cy=db-views-view-${cyEscape(testView)}]`,
      [
        newExpectation(
          "",
          "[data-cy=mobile-sql-editor-button]",
          newShouldArgs("be.visible.and.contain", viewQuery),
        ),
      ],
      "[data-cy=show-table-nav-button]",
    ),
  ),
  newExpectation(
    "",
    `[data-cy=repo-views-view-button-${cyEscape(testView)}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
  newExpectation(
    "",
    "[data-cy=mobile-sql-editor-button]",
    newShouldArgs("be.visible.and.contain", viewQuery),
  ),
];

export const emptyViewsExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=repo-no-views]", beVisible)
    : newExpectation("", "[data-cy=repo-views-empty]", beVisible);

const notEmptyViewsExpectations = (
  viewsLen: number,
  testView: string,
  isMobile: boolean,
  viewQuery: string,
): Tests =>
  isMobile
    ? [
        newExpectation(
          "",
          "[data-cy=repo-views-list] > li",
          newShouldArgs("be.visible.and.have.length", viewsLen),
        ),
        ...testViewMobile(testView, viewQuery),
      ]
    : [
        newExpectation(
          "",
          "[data-cy=repo-views-list] > li",
          newShouldArgs("be.visible.and.have.length", viewsLen),
        ),
        newExpectationWithClickFlow(
          "should successfully execute a view",
          `[data-cy=db-views-view-${cyEscape(testView)}]`,
          beVisible,
          testViewClickFlow(testView, viewQuery),
        ),
      ];

const viewsClickFlow = (
  hasBranch: boolean,
  viewsLen: number,
  testView: string | undefined,
  isMobile: boolean,
  viewQuery?: string,
): ClickFlow => {
  const expectations =
    viewsLen === 0 || !testView
      ? [emptyViewsExpectation(hasBranch)]
      : notEmptyViewsExpectations(
          viewsLen,
          testView,
          isMobile,
          viewQuery ?? `select * from ${testView}`,
        );

  return newClickFlow("[data-cy=tab-views]", expectations);
};

// viewQuery is the query expected in the SQL editor after clicking testView.
// Defaults to the Dolt query; Doltgres uses `SELECT * FROM <schema>.<view>`.
export const testViewsSection = (
  hasBranch: boolean,
  viewsLen: number,
  testView?: string,
  isMobile = false,
  viewQuery?: string,
): Expectation => {
  if (viewsLen > 0 && !testView) {
    throw new Error("Cannot have viewsLen > 0 and no testView");
  }
  return newExpectationWithClickFlow(
    "should have repo Views section",
    "[data-cy=tab-views]",
    beVisible,
    viewsClickFlow(hasBranch, viewsLen, testView, isMobile, viewQuery),
  );
};

// QUERY CATALOG

const testQueryClickFlow = (testQuery: string): ClickFlow =>
  newClickFlow(`[data-cy=repo-query-button-${cyEscape(testQuery)}]`, [
    newExpectation(
      "",
      `[data-cy=repo-query-viewing-${cyEscape(testQuery)}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `select * from ${testQuery}`),
    ),
  ]);

const testQueryMobile = (testQuery: string): Expectation[] => [
  newExpectationWithClickFlow(
    "should successfully execute a query",
    `[data-cy=repo-query-list-query-${cyEscape(testQuery)}]`,
    beVisible,
    newClickFlow(
      `[data-cy=repo-query-button-${cyEscape(testQuery)}]`,
      [
        newExpectation(
          "",
          "[data-cy=mobile-sql-editor-button]",
          newShouldArgs("be.visible.and.contain", `select * from ${testQuery}`),
        ),
      ],
      "[data-cy=show-table-nav-button]",
    ),
  ),
  newExpectation(
    "",
    `[data-cy=repo-query-viewing-${cyEscape(testQuery)}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
];

export const emptyQueriesExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=repo-no-queries]", beVisible)
    : newExpectation("", "[data-cy=repo-queries-empty]", beVisible);

const notEmptyQueriesExpectations = (
  queryLen: number,
  testQuery: string,
  isMobile = false,
): Tests =>
  isMobile
    ? [
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
        ...testQueryMobile(testQuery),
      ]
    : [
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
        newExpectationWithClickFlow(
          "should successfully execute a query",
          `[data-cy=repo-query-list-query-${cyEscape(testQuery)}]`,
          beVisible,
          testQueryClickFlow(testQuery),
        ),
      ];

const queryCatalogClickFlow = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
  isMobile = false,
): ClickFlow => {
  const expectations =
    queryLen === 0 || !testQuery
      ? [emptyQueriesExpectation(hasBranch)]
      : notEmptyQueriesExpectations(queryLen, testQuery, isMobile);

  return newClickFlow("[data-cy=tab-queries]", expectations);
};

export const testQueryCatalogSection = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
  isMobile = false,
): Expectation => {
  if (queryLen > 0 && !testQuery) {
    throw new Error("Cannot have queryLen > 0 and no testQuery");
  }
  return newExpectationWithClickFlow(
    "should have repo Query Catalog section",
    "[data-cy=tab-queries]",
    beVisible,
    queryCatalogClickFlow(hasBranch, queryLen, testQuery, isMobile),
  );
};

// SCHEMAS

const testSchemaClickFlow = (
  testSchema: string,
  schemaQuery: string,
): ClickFlow =>
  newClickFlow(`[data-cy=repo-tables-schema-${cyEscape(testSchema)}-play]`, [
    newExpectation(
      "",
      `[data-cy=repo-tables-schema-${cyEscape(testSchema)}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", schemaQuery),
    ),
  ]);

const testSchemaMobile = (
  schemaLen: number,
  testSchema: string,
  schemaQuery: string,
): Expectation[] => [
  newExpectation(
    "",
    "[data-cy=repo-tables-schema-list] > ol > li",
    newShouldArgs("be.visible.and.have.length", schemaLen),
  ),
  newExpectationWithClickFlow(
    "should successfully execute a schema",
    `[data-cy=repo-tables-schema-${cyEscape(testSchema)}]`,
    beVisible,
    newClickFlow(
      `[data-cy=repo-tables-schema-${cyEscape(testSchema)}-play]`,
      [
        newExpectation(
          "",
          "[data-cy=mobile-sql-editor-button]",
          newShouldArgs("be.visible.and.contain", schemaQuery),
        ),
      ],
      "[data-cy=show-table-nav-button]",
    ),
  ),
  newExpectation(
    "",
    `[data-cy=repo-tables-schema-${cyEscape(testSchema)}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
];

export const emptySchemaExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=repo-tables-empty]", beVisible)
    : newExpectation("", "[data-cy=repo-schemas-empty]", beVisible);

const notEmptySchemaExpectations = (
  schemaLen: number,
  testSchema: string,
  isMobile: boolean,
  schemaQuery: string,
): Tests =>
  isMobile
    ? testSchemaMobile(schemaLen, testSchema, schemaQuery)
    : [
        newExpectation(
          "",
          "[data-cy=repo-tables-schema-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", schemaLen),
        ),
        newExpectationWithClickFlow(
          "should successfully execute a schema",
          `[data-cy=repo-tables-schema-${cyEscape(testSchema)}]`,
          beVisible,
          testSchemaClickFlow(testSchema, schemaQuery),
        ),
      ];

const schemaClickFlow = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema: string | undefined,
  isMobile: boolean,
  schemaQuery?: string,
): ClickFlow => {
  const expectations =
    schemaLen === 0 || !testSchema
      ? [emptySchemaExpectation(hasBranch)]
      : notEmptySchemaExpectations(
          schemaLen,
          testSchema,
          isMobile,
          schemaQuery ?? `show create table ${testSchema}`,
        );

  return newClickFlow(
    "[data-cy=tab-schemas]",
    expectations,
    "[data-cy=tab-tables]",
  );
};

// schemaQuery is the query expected in the SQL editor after clicking
// testSchema. Defaults to the Dolt query; Doltgres uses
// `SHOW CREATE TABLE <schema>.<table>`.
export const testSchemaSection = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema?: string,
  isMobile = false,
  schemaQuery?: string,
): Expectation => {
  if (schemaLen > 0 && !testSchema) {
    throw new Error("Cannot have schemaLen > 0 and no testSchema");
  }
  return newExpectationWithClickFlow(
    "should have repo Schema section",
    "[data-cy=tab-schemas]",
    beVisible,
    schemaClickFlow(hasBranch, schemaLen, testSchema, isMobile, schemaQuery),
  );
};
