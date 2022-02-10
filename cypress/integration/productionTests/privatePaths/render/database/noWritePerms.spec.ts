import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import { testRepoHeaderForAll } from "../../../../utils/sharedTests/repoHeaderNav";
import { tableExpectations } from "../../../../utils/sharedTests/repoLeftNav";
import {
  beVisible,
  notExist,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Logged in database page with no write perms";
const currentOwner = "dolthub";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;
const canWrite = false;
const hasDocs = true;
const hasBranch = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should find doc markdown",
      "[data-cy=repo-doc-markdown]",
      beVisible,
    ),
    ...testRepoHeaderForAll(currentRepo, currentOwner, canWrite, hasDocs),
    ...tableExpectations(
      hasDocs,
      hasBranch,
      canWrite,
      11,
      "characteristics_case_severity",
    ),
    newExpectationWithClickFlows(
      "should click first row dropdown button",
      "[data-cy=repo-data-table-row-0-col-0]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=row-dropdown-button]:first",
          [],
          "[data-cy=delete-row-button]",
          true,
        ),
      ],
    ),
    newExpectationWithClickFlows(
      "should show fork modal",
      "[data-cy=create-fork-modal]",
      newShouldArgs("be.visible.and.contain", "cypresstesting"),
      [
        newClickFlow("[data-cy=cancel-button]", [
          newExpectation(
            "should not have open fork modal",
            "[data-cy=create-fork-modal]",
            notExist,
          ),
        ]),
      ],
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
