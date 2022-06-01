import { runTestsForDevices } from "../../../../../utils";
import {
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../../utils/helpers";
import { testPaginationForRepoDataTable } from "../../../../../utils/sharedTests/pagination";
import { testRepoHeaderWithBranch } from "../../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../../utils/sharedTests/sqlEditor";
import { mobileTests } from "../../../../../utils/sharedTests/testRepoPageMobile";

const pageName = "Database page (wikipedia-ngrams) with tables";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = false;
const hasBranch = true;

const beVisible = newShouldArgs("be.visible");

describe(`${pageName} renders expected components on different devices`, () => {
  const tablesClickFlow = newClickFlow(
    "[data-cy=active-tab-tables]",
    [
      newExpectation(
        "",
        "[data-cy=repo-tables-table-list] > ol > li",
        newShouldArgs("be.visible.and.have.length", 4),
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-bigram_counts-column-list]",
        beVisible,
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-bigram]",
        beVisible,
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-total_count]",
        beVisible,
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-article_count]",
        beVisible,
      ),
    ],
    "[data-cy=repo-tables-table-list]",
  );

  const bigramsToTotalsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-total_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-dump_date]",
        newShouldArgs("be.visible.and.contain", "dump_date"),
      ),
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-row-1-col-0]",
        newShouldArgs("be.visible.and.contain", "8-01-19"),
      ),
    ],
  );

  const totalsToTrigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-trigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-column-trigram]",
        newShouldArgs("be.visible.and.contain", "trigram"),
      ),
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-row-0-col-2]",
        newShouldArgs("be.visible.and.contain", "113"),
      ),
    ],
  );

  const trigramsToUnigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-unigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-column-unigram]",
        newShouldArgs("be.visible.and.contain", "unigram"),
      ),
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-row-0-col-1]",
        newShouldArgs("be.visible.and.contain", "65929"),
      ),
    ],
  );

  const unigramsToBigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-bigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-column-bigram]",
        newShouldArgs("be.visible.and.contain", "bigram"),
      ),
      newExpectation(
        "",
        "[data-cy=desktop-repo-data-table-row-0-col-2]",
        newShouldArgs("be.visible.and.contain", "1444"),
      ),
    ],
  );

  const unigramClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-unigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-unigram]",
        newShouldArgs("be.visible.and.contain", "unigram"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-unigram_counts]",
        beVisible,
      ),
    ],
  );

  const tablesClickFlow2 = newClickFlow("", [
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-tables-table-total_counts]",
      beVisible,
      [bigramsToTotalsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-tables-table-column-dump_date]",
      beVisible,
      [totalsToTrigramsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-tables-table-column-trigram]",
      beVisible,
      [trigramsToUnigramsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-tables-table-column-unigram]",
      beVisible,
      [unigramsToBigramsClickFlow],
    ),
  ]);

  const tablesCloseClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-trigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-tables-table-column-trigram]",
        newShouldArgs("be.visible.and.contain", "trigram"),
      ),
      newExpectationWithClickFlows(
        "",
        "[data-cy=repo-tables-table-unigram_counts]",
        beVisible,
        [unigramClickFlow],
      ),
    ],
  );

  const desktopAndIpadTests = (isIpad = false) => [
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    newExpectationWithClickFlows(
      "should have repo Tables section",
      "[data-cy=repo-tables-table-list]",
      beVisible,
      [tablesClickFlow],
    ),

    newExpectation(
      "should find repo data",
      "[data-cy=repo-data-table-empty]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should display repo data columns",
      "[data-cy=desktop-repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 4),
    ),
    newExpectation(
      "should display repo data row column values",
      "[data-cy=desktop-repo-data-table-row-0-col-1]",
      newShouldArgs("be.visible.and.contain", "3071"),
    ),
    ...tableExpectations(hasDocs, loggedIn, 4, "bigram_counts"),
    newExpectationWithClickFlows(
      "should update data table when table clicked",
      "[data-cy=repo-tables-table-column-bigram]",
      beVisible,
      [tablesClickFlow2],
    ),
    newExpectationWithClickFlows(
      "should stay on Tables tab after a new table is selected",
      "[data-cy=active-tab-tables]",
      beVisible,
      [tablesCloseClickFlow],
    ),
    ...testPaginationForRepoDataTable,
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 4, "bigram_counts"),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    // iPad2ForAppLayout(pageName, desktopAndIpadTests(true), true), // Not optimized for ipad, test is flaky
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentRepo, currentPage, hasDocs, hasBranch),
      true,
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
