import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";

const beVisible = newShouldArgs("be.visible");

const checkCurrentBranch = (currentBranch: string) =>
  newExpectation(
    "should have current branch",
    `[data-cy=none-found-branch]`,
    newShouldArgs("be.visible.and.contain", currentBranch),
  );

export const clickAndCheckCurrentBranch = (
  currentBranch: string,
  openMenu: boolean,
) =>
  openMenu
    ? newExpectationWithClickFlows(
        "should click to open left nav",
        `[data-cy=left-nav-toggle-icon]`,
        beVisible,

        [
          newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
            checkCurrentBranch(currentBranch),
          ]),
        ],
      )
    : checkCurrentBranch(currentBranch);
