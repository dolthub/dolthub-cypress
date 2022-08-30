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
    `[data-cy=branch-selector]`,
    newShouldArgs("be.visible.and.contain", currentBranch),
  );

export const clickAndCheckCurrentBranch = (
  currentBranch: string,
  openMenu: boolean,
) =>
  openMenu
    ? newExpectationWithClickFlows(
        "should click to open left nav",
        `[data-cy=database-table-nav-menu`,
        beVisible,

        [
          newClickFlow(`[data-cy=database-table-nav-menu]`, [
            checkCurrentBranch(currentBranch),
          ]),
        ],
      )
    : checkCurrentBranch(currentBranch);
