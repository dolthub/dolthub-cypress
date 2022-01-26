import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { mobileTests } from "../../../../utils/sharedTests/testRepoPageMobile";
import { Tests } from "../../../../utils/types";

const pageName = "Database page with docs and no tables";
const currentOwner = "automated_testing";
const currentRepo = "repo_docs_no_tables";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = false;
const hasDocs = true;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const desktopAndIpadTests = (isIpad = false): Tests => [
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
      isIpad,
    ),
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 0),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 0),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopAndIpadTests(),
    desktopAndIpadTests(true),
    mobileTests(currentOwner, currentRepo, hasDocs),
  );
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
