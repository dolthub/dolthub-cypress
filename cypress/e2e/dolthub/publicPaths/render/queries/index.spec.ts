import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { ClickFlow } from "@utils/types";

const pageName = "Query catalog page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/queries/${currentBranch}`;

const firstQuery = "current_view";
const lastQuery = "Changes_other_than_expected";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const queryClickFlow = (forFirst: boolean): ClickFlow =>
    newClickFlow(
      `[data-cy=query-catalog-table-row]:${forFirst ? "first" : "last"}`,
      [
        newExpectation(
          "",
          `[data-cy=query-catalog-table-row-expanded-${firstQuery}]`,
          forFirst ? beVisible : notExist,
        ),
        newExpectation(
          "",
          `[data-cy=query-catalog-table-row-expanded-${lastQuery}]`,
          forFirst ? notExist : beVisible,
        ),
        newExpectation(
          "should have expanded first query with play button",
          `[data-cy=query-catalog-table-row-expanded-${
            forFirst ? firstQuery : lastQuery
          }] button`,
          beVisible,
        ),
      ],
    );

  const tests = [
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, true),
    newExpectation(
      "should not find empty queries message",
      "[data-cy=repo-no-queries]",
      notExist,
    ),
    newExpectation(
      "should find queries table with header",
      "[data-cy=query-catalog-table] > thead > tr > th",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should find 10 queries",
      "[data-cy=query-catalog-table-row]",
      newShouldArgs("be.visible.and.have.length", 10),
    ),
    newExpectationWithClickFlow(
      "should expand first query",
      "[data-cy=query-catalog-table-row]:first",
      beVisible,
      queryClickFlow(true),
    ),
    scrollToPosition("#main-content", "bottom"),
    newExpectationWithClickFlow(
      "should expand last query and close first query on click",
      "[data-cy=query-catalog-table-row]:last",
      beVisible,
      queryClickFlow(false),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
