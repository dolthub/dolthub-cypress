import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import { testPaginationForRepoDataTable } from "../../../../utils/sharedTests/pagination";
import {
  testAboutSection,
  testCommitSection,
  testIndexesSection,
  testPullRequestsSection,
  testQueryCatalogSection,
  testReleasesSection,
  testRepoHeaderWithBranch,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Repository page (wikipedia-ngrams) with tables";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;

const beVisible = newShouldArgs("be.visible");

describe(`${pageName} renders expected components on different devices`, () => {
  const tablesClickFlow = newClickFlow(
    "[data-cy=repo-tables]",
    [
      newExpectation(
        "",
        "[data-cy=repo-tables-table-list] > li",
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
    "[data-cy=repo-tables]",
  );

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner),
    testAboutSection(false),
    newExpectationWithClickFlows(
      "should have repo Tables section",
      "[data-cy=repo-tables]",
      beVisible,
      [tablesClickFlow],
    ),
    testIndexesSection(4, "unigram_counts"),
    testViewsSection(0),
    testQueryCatalogSection(0),
    testCommitSection(5),
    testReleasesSection(0),
    testPullRequestsSection(0),
    newExpectation(
      "should find repo data",
      "[data-cy=repo-data-table-empty]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should display repo data columns",
      "[data-cy=repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should display repo data row column values",
      "[data-cy=repo-data-table-row-0-col-1]",
      newShouldArgs("be.visible.and.contain", "3071"),
    ),
    ...testPaginationForRepoDataTable,
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});

describe("RepositoryPage wikipedia-ngrams re-re-renders expected components on different devices", () => {
  const bigramsToTotalsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-total_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-dump_date]",
        newShouldArgs("be.visible.and.contain", "dump_date"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-data-table-row-1-col-0]",
        newShouldArgs("be.visible.and.contain", "8-01-19"),
      ),
    ],
  );

  const totalsToTrigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-trigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-trigram]",
        newShouldArgs("be.visible.and.contain", "trigram"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-data-table-row-0-col-2]",
        newShouldArgs("be.visible.and.contain", "113"),
      ),
    ],
  );

  const trigramsToUnigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-unigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-unigram]",
        newShouldArgs("be.visible.and.contain", "unigram"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-data-table-row-0-col-1]",
        newShouldArgs("be.visible.and.contain", "65929"),
      ),
    ],
  );

  const unigramsToBigramsClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-bigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-bigram]",
        newShouldArgs("be.visible.and.contain", "bigram"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-data-table-row-0-col-2]",
        newShouldArgs("be.visible.and.contain", "1444"),
      ),
    ],
  );

  const tablesClickFlow = newClickFlow("", [
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-tables-table-total_counts]",
      beVisible,
      [bigramsToTotalsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-data-table-column-dump_date]",
      beVisible,
      [totalsToTrigramsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-data-table-column-trigram]",
      beVisible,
      [trigramsToUnigramsClickFlow],
    ),
    newExpectationWithClickFlows(
      "",
      "[data-cy=repo-data-table-column-unigram]",
      beVisible,
      [unigramsToBigramsClickFlow],
    ),
  ]);

  const unigramClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-unigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-unigram]",
        newShouldArgs("be.visible.and.contain", "unigram"),
      ),
      newExpectation(
        "",
        "[data-cy=repo-tables-table-unigram_counts]",
        beVisible,
      ),
    ],
  );

  const tablesCloseClickFlow = newClickFlow(
    "[data-cy=repo-tables-table-trigram_counts-play]",
    [
      newExpectation(
        "",
        "[data-cy=repo-data-table-column-trigram]",
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

  const tests = [
    newExpectationWithClickFlows(
      "should update data table when table clicked",
      "[data-cy=repo-data-table-column-bigram]",
      beVisible,
      [tablesClickFlow],
    ),
    newExpectationWithClickFlows(
      "should keep Tables section open after new table selected",
      "[data-cy=repo-tables]",
      beVisible,
      [tablesCloseClickFlow],
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
