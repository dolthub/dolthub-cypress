import { databaseTypeConfigs } from "@sharedTests/databaseTypes";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "@sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "@sharedTests/repoLeftNav";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { Tests } from "@utils/types";

const currentRepo = "repo_docs_no_tables";
const loggedIn = false;
const hasDocs = true;
const hasBranch = true;

databaseTypeConfigs.forEach(({ label, currentOwner, isDoltgres }) => {
  const pageName = `${label} page with docs and no tables`;
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;

  describe(`${pageName} renders expected components on different devices`, () => {
    const beVisible = newShouldArgs("be.visible");
    const notExist = newShouldArgs("not.exist");

    const tests: Tests = [
      newExpectation(
        "should not find empty database",
        "[data-cy=repo-data-table-empty]",
        notExist,
      ),
      newExpectation(
        "should not find database table data",
        "[data-cy=repo-data-table]",
        notExist,
      ),
      newExpectation(
        "should find doc markdown",
        "[data-cy=repo-doc-markdown]",
        beVisible,
      ),
      ...testRepoHeaderWithBranch(
        currentRepo,
        currentOwner,
        loggedIn,
        hasDocs,
        "about",
        isDoltgres,
      ),
      ...tableExpectations(hasDocs, loggedIn, 0),
      testViewsSection(hasBranch, 0),
      testQueryCatalogSection(hasBranch, 0),
      testSchemaSection(hasBranch, 0),
    ];

    const devices = [
      macbook15ForAppLayout(pageName, tests),
      iPad2ForAppLayout(pageName, tests),
      iPhoneXForAppLayout(
        pageName,
        testMobileRepoHeaderNav(currentOwner, currentRepo, "about"),
      ),
    ];
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  });
});
