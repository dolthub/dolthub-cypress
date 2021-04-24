import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import {
  testAboutSection,
  testCommitSection,
  testPullRequestsSection,
  testQueryCatalogSection,
  testReleasesSection,
  testRepoHeaderWithBranch,
  testTablesSection,
  testViewsSection,
} from "../../../../utils/sharedTests/repoLeftNav";
import { testSqlConsole } from "../../../../utils/sharedTests/sqlEditor";

const pageName = "Repository page with tags and branches";
const currentOwner = "automated_testing";
const currentRepo = "repo_with_tags_and_branches";

const notExist = newShouldArgs("not.exist");

describe(`${pageName} renders expected components on different devices`, () => {
  const currentPage = `repositories/${currentOwner}/${currentRepo}`;

  const tests = [
    newExpectation(
      "should not find empty repo",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    testSqlConsole,
    ...testRepoHeaderWithBranch(currentRepo, currentOwner),
    testAboutSection(true),
    testTablesSection(1, "test"),
    testViewsSection(0),
    testQueryCatalogSection(0),
    testCommitSection(5),
    testReleasesSection(5),
    testPullRequestsSection(0),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
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

describe(`All refs for repo_with_tags_and_branches are usable`, () => {
  const tests = (i: number) => {
    const num = i + 2 < 5 ? i + 2 : 5;
    return [
      newExpectation(
        "should not find empty repo",
        "[data-cy=repo-data-table-empty]",
        notExist,
      ),
      testCommitSection(num),
      testReleasesSection(5),
    ];
  };

  for (let i = 1; i <= 20; i++) {
    const tag = `v${i}`;
    const currentPage = `repositories/${currentOwner}/${currentRepo}/data/${tag}`;
    const devices = [macbook15ForAppLayout(pageName, tests(i))];
    const skip = true;
    runTestsForDevices({ currentPage, devices, skip });
  }
});
