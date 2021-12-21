import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newExpectationWithURL,
  newExpectationWithVisitPage,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { beVisibleAndContain } from "./sharedFunctionsAndVariables";

const beVisible = newShouldArgs("be.visible");

const deleteDatabaseModal = newClickFlow(
  "[data-cy=delete-database-button]",
  [
    newExpectation(
      "should open delete database modal",
      "[data-cy=submit-delete-database]",
      beVisible,
    ),
  ],
  "[data-cy=submit-delete-database]",
);

const settingsClickFlow = (repoName: string, ownerName: string) =>
  newClickFlow("[data-cy=repo-settings-tab]", [
    newExpectationWithURL(
      "should navigate to settings",
      "[data-cy=update-repo-form]",
      beVisible,
      `/repositories/${ownerName}/${repoName}/settings`,
    ),
    newExpectationWithScrollIntoView(
      "should have delete database button in view",
      "[data-cy=delete-database-button]",
      beVisible,
      true,
    ),
    newExpectationWithClickFlows(
      "should open delete database modal",
      "[data-cy=delete-database-button]",
      beVisible,
      [deleteDatabaseModal],
    ),
  ]);

export const deleteTempDatabase = (
  repoName: string,
  ownerName: string,
): Tests => [
  newExpectationWithVisitPage(
    "should route to database page",
    "[data-cy=repo-breadcrumbs]",
    beVisibleAndContain(`${ownerName}`),
    `/repositories/${ownerName}/${repoName}`,
  ),
  newExpectationWithClickFlows(
    "should navigate to settings tab and delete database",
    "[data-cy=repo-settings-tab]",
    beVisible,
    [settingsClickFlow(repoName, ownerName)],
  ),
  newExpectationWithURL(
    "should navigate to profile after deletion",
    "[data-cy=repository-list-for-user]",
    beVisible,
    `/profile`,
  ),
];
