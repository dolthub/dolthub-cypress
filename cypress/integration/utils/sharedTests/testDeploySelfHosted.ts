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
    [newClickFlow("[data-cy=self-hosted-button]", [])],
  ),
  newExpectation(
    "should find download docker button",
    "[data-cy=self-hosted-download-dockerfile-button]",
    beVisible,
  ),
];
