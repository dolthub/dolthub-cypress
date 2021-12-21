import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { testRepoHeaderForAll } from "./repoHeaderNav";
import { exist } from "./sharedFunctionsAndVariables";

const beVisible = newShouldArgs("be.visible");

const createDBClickFlow = (repoName: string, ownerName: string) =>
  newClickFlow("[data-cy=submit-create-database-form]", [
    newExpectationWithURL(
      "should route to database page",
      "[data-cy=repo-empty-get-started]",
      beVisible,
      `/repositories/${ownerName}/${repoName}`,
    ),
    ...testRepoHeaderForAll(repoName, ownerName, true, false),
    newExpectation(
      "should route to empty database page",
      "[data-cy=repo-empty-get-started]",
      beVisible,
    ),
  ]);

export const createTempDatabase = (
  repoName: string,
  ownerName: string,
  visibility = "public",
): Tests => [
  newExpectation(
    "should find new database form",
    "[data-cy=new-repo-form]",
    beVisible,
  ),
  newExpectationWithTypeString(
    "should input new database name",
    "input[name=database-name]",
    beVisible,
    { value: repoName },
  ),
  newExpectationWithTypeString(
    "should input new database description",
    "textarea[name=database-description]",
    beVisible,
    {
      value:
        "This is a temporary database to test write operations in DoltHub's Cypress tests (https://github.com/dolthub/dolthub-cypress). Delete me if my last update is over an hour ago.",
    },
  ),
  newExpectationWithClickFlows(
    "should choose visibility for database",
    `[data-cy=radio-${visibility}]`,
    exist,
    [newClickFlow(`[data-cy=radio-${visibility}]`, [])],
  ),
  newExpectationWithClickFlows(
    "should create new database",
    "[data-cy=submit-create-database-form]",
    newShouldArgs("be.enabled"),
    [createDBClickFlow(repoName, ownerName)],
  ),
];
