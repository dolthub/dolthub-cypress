import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";

const beVisible = newShouldArgs("be.visible");

const checkCurrentBranch = (currentBranch: string): Expectation =>
  newExpectation(
    "should have current branch",
    `[data-cy=branch-and-tag-selector]`,
    newShouldArgs("be.visible.and.contain", currentBranch),
  );

export const openLeftNavAndCheckCurrentBranch = (
  currentBranch: string,
  isLeftNavClosed: boolean,
): Expectation =>
  isLeftNavClosed
    ? newExpectationWithClickFlow(
        "should click to open left nav",
        `[data-cy=left-nav-toggle-icon`,
        beVisible,
        newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
          checkCurrentBranch(currentBranch),
        ]),
      )
    : checkCurrentBranch(currentBranch);
