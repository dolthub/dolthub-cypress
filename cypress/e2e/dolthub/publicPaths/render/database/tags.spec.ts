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
import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { Expectation } from "@utils/types";

const pageName = "Database page with tags and branches";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_tags_and_branches";

const notExist = newShouldArgs("not.exist");
const loggedIn = false;
const hasBranch = true;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;

  const tests = [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, false),
    ...tableExpectations(hasDocs, loggedIn, 1, "test"),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 1, "test"),
    testSqlConsole,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(
      pageName,
      testMobileRepoHeaderNav(currentOwner, currentRepo),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});

export const testReleasesSection = (tagLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have database Tag List section",
    "[data-cy=repo-releases-tab]",
    newShouldArgs("be.visible"),
    [
      newClickFlow("[data-cy=repo-releases-tab]", [
        newExpectation(
          "",
          "[data-cy=release-list-item]",
          newShouldArgs("be.visible.and.have.length.of.at.least", tagLen - 1),
        ),
        newExpectation(
          "should find csv download icon",
          "[data-cy=dump-csv]",
          beVisible,
        ),
      ]),
    ],
  );

export const testCommitSection = (commitLen: number): Expectation =>
  newExpectationWithClickFlows(
    "should have database Commit Log section",
    "[data-cy=repo-commit-log-tab]",
    newShouldArgs("be.visible"),
    [
      newClickFlow("[data-cy=repo-commit-log-tab]", [
        newExpectation(
          "",
          "[data-cy=commit-log-item]",
          newShouldArgs("be.visible.and.have.length", commitLen),
        ),
      ]),
    ],
  );

const tests = (n: number) => {
  const num = n + 2;
  return [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    testCommitSection(num),
    // testReleasesSection(21),
  ];
};

describe(`All refs for repo_with_tags_and_branches are usable`, () => {
  for (let i = 1; i <= 10; i++) {
    const tag = `v${i}`;
    const tagPageName = `${pageName} (tag ${tag})`;
    const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${tag}`;
    const devices = [
      macbook15ForAppLayout(tagPageName, tests(i)),
      iPad2ForAppLayout(tagPageName, tests(i)),
    ];
    const skip = false;

    runTestsForDevices({ currentPage, devices, skip });
  }
});
