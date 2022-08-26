import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";

const beVisible = newShouldArgs("be.visible");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

type TestParams = {
  openMenu: boolean;
  branchCheckID: string;
  optionalText?: string;
  newBranch: string;
  newBranchOptionalText?: string;
};

const openBranch = (testParams: TestParams) =>
  testParams.openMenu
    ? newExpectationWithClickFlows(
        "should open menu",
        `[data-cy=left-nav-toggle-icon]`,
        beVisible,
        [
          newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
            newExpectationWithClickFlows(
              "should open branch selector",
              `[data-cy=branch-selector]`,
              beVisible,
              [
                newClickFlow(`[data-cy=branch-selector]`, [
                  newExpectation(
                    "should see see new branch ",
                    `[data-cy=${testParams.newBranch}]`,
                    beVisible,
                  ),
                ]),
              ],
            ),
          ]),
        ],
      )
    : newExpectationWithClickFlows(
        "should open branch selector",
        `[data-cy=branch-selector]`,
        beVisible,
        [
          newClickFlow(`[data-cy=branch-selector]`, [
            newExpectation(
              "should see see new branch ",
              `[data-cy=${testParams.newBranch}]`,
              beVisible,
            ),
          ]),
        ],
      );

export const changeBranch = (testParams: TestParams) => [
  newExpectation(
    `should check current branch ${testParams.branchCheckID}`,
    `[data-cy=${testParams.branchCheckID}]`,
    testParams.optionalText
      ? beVisibleAndContain(testParams.optionalText)
      : beVisible,
  ),
  openBranch(testParams),
  newExpectationWithClickFlows(
    "should click on other branch",
    `[data-cy=${testParams.newBranch}]`,
    beVisible,
    [
      newClickFlow(`[data-cy=${testParams.newBranch}]`, [
        newExpectation(
          "should see see new branch ",
          `[data-cy=${testParams.branchCheckID}]`,
          testParams.newBranchOptionalText
            ? beVisibleAndContain(testParams.newBranchOptionalText)
            : beVisible,
        ),
      ]),
    ],
  ),
];
