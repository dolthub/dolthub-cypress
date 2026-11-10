import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";

const beVisible = newShouldArgs("be.visible");

export const toggleInstallationStepsFlow = newClickFlow(
  "[data-cy=show-installation-steps]",
  [
    newExpectationWithScrollIntoView(
      "should have link to copy Dolt install script",
      "[data-cy=repo-empty-copy-dolt-release]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have link to latest Dolt releases",
      "[data-cy=repo-empty-dolt-release-latest]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have link to Dolt source",
      "[data-cy=repo-empty-dolt-source]",
      beVisible,
      true,
    ),
  ],
  "[data-cy=show-installation-steps]",
);

export const testDoltInstallationSteps: Expectation[] = [
  newExpectationWithScrollIntoView(
    "should scroll down to Dolt installation steps",
    "[data-cy=show-installation-steps]",
    newShouldArgs("exist"),
    true,
  ),
  newExpectationWithClickFlow(
    "should show Dolt installation steps",
    "[data-cy=show-installation-steps]",
    beVisible,
    toggleInstallationStepsFlow,
  ),
];

const notExist = newShouldArgs("not.exist");

// Doltgres databases replace the Dolt CLI instructions with Doltgres SQL
// session instructions and link out to the Doltgres installation docs.
const testDoltgresGetStarted: Expectation[] = [
  newExpectationWithScrollIntoView(
    "should have Create new Doltgres database section",
    "[data-cy=repo-empty-create-new-doltgres-repo]",
    beVisible,
    true,
  ),
  newExpectationWithScrollIntoView(
    "should have Push existing Doltgres database section",
    "[data-cy=repo-empty-push-doltgres]",
    beVisible,
    true,
  ),
  newExpectation(
    "should not have Dolt Create new database section",
    "[data-cy=repo-empty-create-new-repo]",
    notExist,
  ),
  newExpectation(
    "should not have Dolt Push existing database section",
    "[data-cy=repo-empty-push-local-repo]",
    notExist,
  ),
  newExpectation(
    "should not have Dolt installation steps",
    "[data-cy=show-installation-steps]",
    notExist,
  ),
];

const testDoltGetStarted: Expectation[] = [
  newExpectationWithScrollIntoView(
    "should have Create new database section",
    "[data-cy=repo-empty-create-new-repo]",
    beVisible,
    true,
  ),
  newExpectationWithScrollIntoView(
    "should have Push existing database section",
    "[data-cy=repo-empty-push-local-repo]",
    beVisible,
    true,
  ),
  ...testDoltInstallationSteps,
];

// Engine-specific command line instructions for an empty database.
export const testGetStartedForEngine = (isDoltgres: boolean): Expectation[] =>
  isDoltgres ? testDoltgresGetStarted : testDoltGetStarted;
