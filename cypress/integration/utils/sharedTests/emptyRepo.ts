import {
  newClickFlow,
  newExpectationWithClickFlows,
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

export const testDoltInstallationSteps: Expectation = newExpectationWithClickFlows(
  "should show Dolt installation steps",
  "[data-cy=show-installation-steps]",
  beVisible,
  [toggleInstallationStepsFlow],
);
