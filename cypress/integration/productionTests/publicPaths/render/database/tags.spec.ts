import { testSqlConsole } from "cypress/integration/utils/sharedTests/sqlEditor";
import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  tableExpectations,
  testViewsSection,
  testQueryCatalogSection,
  testSchemaSection,
} from "../../../../utils/sharedTests/repoDatabaseNav";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
// import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";
import { Expectation } from "../../../../utils/types";

const pageName = "Database page with tags and branches";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_tags_and_branches";

const notExist = newShouldArgs("not.exist");
const loggedIn = false;
const hasBranch = true;
const hasDocs = true;

// TODO: Test commented out sections for left nav
describe(`${pageName} renders expected components on different devices`, () => {
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;

  const tests = [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, loggedIn, false),
    ...tableExpectations(hasDocs, hasBranch, loggedIn, 1, "test"),
    testViewsSection(hasBranch, 0),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 1, "test"),
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});

// `repo_with_tags_and_branches` was made for testing
// tags and branches as refs on Dolthub.
// It has one table:
//
//  CREATE TABLE `test` (
//     `pk` INT NOT NULL,
//     `note` LONGTEXT,
//     PRIMARY KEY (`pk`)
//   );
//
// It has 4 branches:
//
//   fifteen
//   five
// * master
//   ten
//
// It has 21 tags:
//
//	v20
// 	v19
//  ...
// 	v1
// 	start
//
// It has 23 commits:
//
// commit 7rj0pd2srpftde0qh6ocjqo6ts0v5d1g
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:46:54 -0700 2020
//
// 	added README
//
// commit 44em5msekdb4mj32g4ocaos6usodkmr9
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:36:52 -0700 2020
//
// 	added row with value 20
//
// commit 16ohpemh3ta66tdeb28ntildr3dcuacv
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:36:52 -0700 2020
//
// 	added row with value 19
//
// ...
//
// commit 0ngbhk163gbu4d6te9fdocu0tdbs6ir7
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:36:49 -0700 2020
//
// 	added row with value 1
//
// commit idugn19r85qctvr6kks23i839dvqe2q8
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:28:54 -0700 2020
//
// 	created table test
//
// commit 2blr4m6bu996vgv273febvn20qdathat
// Author: Andy Arthur <andy@liquidata.co>
// Date:   Wed Sep 09 12:27:17 -0700 2020
//
// 	Initialize data repository
//

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

describe(`All refs for repo_with_tags_and_branches are usable`, () => {
  const tests = (i: number) => {
    const num = i + 2;
    return [
      newExpectation(
        "should not find empty database",
        "[data-cy=repo-data-table-empty]",
        notExist,
      ),
      testCommitSection(num),
      testReleasesSection(21),
    ];
  };

  for (let i = 1; i <= 20; i++) {
    const tag = `v${i}`;
    const tagPageName = `${pageName} (tag ${tag})`;
    const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${tag}`;
    const devices = [macbook15ForAppLayout(tagPageName, tests(i))];
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  }
});
