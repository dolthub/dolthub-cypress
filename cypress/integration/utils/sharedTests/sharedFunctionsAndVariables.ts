import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notExist = newShouldArgs("not.exist");
export const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

export const mergingAndDeletingBranch = (title: string) => [
  newExpectation(
    `Should have title ${title}`,
    "[data-cy=pull-page-title]",
    beVisible,
  ),
  newExpectation(
    "Should have Open pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Open"),
  ),
  newExpectationWithClickFlows(
    "should merge",
    "[data-cy=merge-button]",
    beVisible,
    [
      newClickFlow("[data-cy=merge-button]", [
        newExpectation(
          "Should say 'merging'",
          "[data-cy=merge-button]",
          beVisibleAndContain("Merging..."),
        ),
      ]),
    ],
  ),
  newExpectation(
    "Should have Merged pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Merged"),
  ),
  newExpectationWithClickFlows(
    "should delete branch",
    "[data-cy=delete-branch-button]",
    beVisible,
    [newClickFlow("[data-cy=delete-branch-button]", [])],
  ),
];

export const typingExpectation = (value: string, datacy: string) =>
  newExpectationWithTypeString(
    `should write description in textbox`,
    `[data-cy=${datacy}]`,
    beVisible,
    value,
  );

export const createPullRequest: Tests = [
  newExpectationWithClickFlows(
    "should show create pull request button",
    "[data-cy=create-pull]",
    beVisible,
    [newClickFlow("[data-cy=create-pull]", [])],
  ),
  newExpectationWithClickFlows(
    "should be able to create pull request",
    "[data-cy=create-pull-button]",
    beVisible,
    [newClickFlow("[data-cy=create-pull-button]", [])],
  ),
];
