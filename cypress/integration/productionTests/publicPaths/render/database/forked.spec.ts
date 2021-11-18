import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  tableExpectations,
  testViewsSection,
  testQueryCatalogSection,
  testSchemaSection,
} from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Forked database page";
const currentOwner = "automated_testing";
const currentRepo = "ip-to-country";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = false;
const hasBranch = true;

// TODO: Test commented out sections for left nav
describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    newExpectation(
      "should find database table data",
      "[data-cy=repo-data-table]",
      beVisible,
    ),
    newExpectation(
      "should not find doc markdown",
      "[data-cy=repo-doc-markdown]",
      notExist,
    ),
    newExpectation(
      "should display data columns",
      "[data-cy=repo-data-table-columns] > th",
      newShouldArgs("be.visible.and.have.length", 8),
    ),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, hasDocs),
    newExpectation(
      "should find forked repo parent detail",
      "[data-cy=forked-parent-repo-detail]",
      beVisible,
    ),
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 2, "IPv4ToCountry"),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 2, "IPv4ToCountry"),
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
