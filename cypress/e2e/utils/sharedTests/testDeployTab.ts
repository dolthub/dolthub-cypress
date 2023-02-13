import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

export const testDeploySelfHosted: Tests = [
  newExpectationWithClickFlows(
    "should show self hosted button",
    "[data-cy=self-hosted-button]",
    beVisible,
    [newClickFlow("[data-cy=self-hosted-button]", [], "")],
  ),
  newExpectation(
    "should have download docker button",
    "[data-cy=self-hosted-download-dockerfile-button]",
    beVisible,
  ),
];

export const testDeployHosted: Tests = [
  newExpectation(
    "should have hosted directions",
    "[data-cy=hosted-doltdb-directions]",
    beVisible,
  ),
  newExpectation(
    "should have Create Deployment button",
    "[data-cy=hosted-create-deployment-button]",
    beVisible,
  ),
];
