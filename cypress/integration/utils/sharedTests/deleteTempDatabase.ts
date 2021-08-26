import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

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
  newExpectationWithClickFlows(
    "should navigate to settings tab and delete database",
    "[data-cy=repo-settings-tab]",
    beVisible,
    [settingsClickFlow(repoName, ownerName)],
  ),
  newExpectationWithURL(
    "should navigate to repositories page after deletion",
    "[data-cy=discover-repo-lists]",
    beVisible,
    `/repositories/${ownerName}`,
  ),
  newExpectationWithClickFlows(
    "should navigate back to profile page",
    "[data-cy=navbar-desktop-profile-link]",
    beVisible,
    [
      newClickFlow("[data-cy=navbar-desktop-profile-link]", [
        newExpectationWithURL(
          "should navigate to profile page after click",
          "[data-cy=repository-list-for-user]",
          beVisible,
          `/profile`,
        ),
      ]),
    ],
  ),
];
